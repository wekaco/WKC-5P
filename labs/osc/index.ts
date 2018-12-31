import logger = require("debug");
const debug = logger("osc:index");

import * as dgram from "dgram";
const port = dgram.createSocket("udp4");

import { Client } from "./src/client";
import { BufferMap } from "./src/buffer_map";

const client = new Client(port, { remote_address: "127.0.0.1", remote_port: 57110 });

client.on("ready", () => {
  debug(`client ready`);
  const map = new BufferMap(client, { offset: 0 });
  map.set(Buffer.from("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")).then(debug);

});

/** TODO:
 * - Process exit handling (notify state off?)
 * - Buffer allocator
 * - Buffer stream
 * - Buffer clusterization
 */
