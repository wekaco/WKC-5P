import logger = require("debug");
const debug = logger("osc:index");

import * as dgram from "dgram";
const port = dgram.createSocket("udp4");

import { Client, ServerOptions } from "./src/client";
const client = new Client(port, { remote_address: "127.0.0.1", remote_port: 57110 });

client.on("ready", () => {
  debug(`client ready`);
});

/** TODO:
 * - Process exit handling (notify state off?)
 * - Buffer allocator
 * - Buffer stream
 * - Buffer clusterization
 */
