import logger = require("debug");
import * as dgram from "dgram";

const debug = logger("osc:index");
const port = dgram.createSocket("udp4");

import handler from "./src/handler";
import buf from "./src/msg";

import { MessageType } from "./src/enums";
import { msg } from "supercolliderjs";


const REMOTE_ADDRESS = "127.0.0.1";
const REMOTE_PORT = 57110;

port.on("message", handler);

/**
 * let numFrames = 32;
 * let numChannels = 1;
 */

for (let bufferID: number = 0; bufferID < 4; bufferID++) {
  const call: Array<string> = msg.bufferSet(bufferID, [
    [ 0, 0.2],
    [ 1, 0.3],
    [ 7, 1],
  ]);
  const b: Buffer = buf(call, MessageType.message);

  port.send(b, REMOTE_PORT, REMOTE_ADDRESS, (err) => {
    if (err) {
      debug(`Send error ${err}`);
    }
  });
}
