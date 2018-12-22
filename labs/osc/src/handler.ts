import logger  = require("debug");
import { Socket } from "dgram";
import { EventEmitter } from "events";

const debug = logger("osc:handler");

import { MessageType, TypeValue } from "./enums";
import { fromBuffer } from "osc-min";

export class MessageHandler extends EventEmitter {
  constructor(port: Socket) {
    super();
    port.on("message", (message: Buffer) => {
      const { address, args, oscType } = fromBuffer(message);
      this.emit(address, args, oscType);
    });
    this.on("/done", (done: Array<TypeValue>, oscType: MessageType): void => {
      const [ { value }, ...args ] = done;
      this.emit(value, args, oscType);
    });
  }
}

export class ErrorHandler {
  constructor(port: Socket) {
    port.on("error", (err: Error) => {
      debug(err);
    });
  }
}
