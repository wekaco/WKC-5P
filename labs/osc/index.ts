import logger = require("debug");
const debug = logger("osc:index");

import { Client, ServerOptions } from "./src/client";

const client = new Client({ remote_address: "127.0.0.1", remote_port: 57110 });

// client.send(b).then(debug);
/**
 * let numFrames = 32;
 * let numChannels = 1;
 */
/**
for (let bufferID: number = 0; bufferID < 4; bufferID++) {
  const call: Array<string> = msg.bufferSet(bufferID, [
    [0, 0.2],
    [1, 0.3],
    [7, 1],
  ]);
  const b: Buffer = buf(call, MessageType.message);

  port.send(b, REMOTE_PORT, REMOTE_ADDRESS, (err) => {
    if (err) {
      debug(`Send error ${err}`);
    }
  });
}**/
