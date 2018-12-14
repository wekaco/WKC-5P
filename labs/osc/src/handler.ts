import logger  = require("debug");
import { Socket } from "dgram";
import { EventEmitter } from "events";

const debug = logger("osc:handler");

import { fromBuffer } from "osc-min";

export class MessageHandler extends EventEmitter {
  constructor(port: Socket) {
    super();
    port.on("message", (message: Buffer) => {
      const { address, args, oscType } = fromBuffer(message);
      this.emit(address, args);
      debug(`${oscType} ${address} ${JSON.stringify(args)}`);
    });
  }
}
