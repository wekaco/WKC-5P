import logger = require("debug");
const debug = logger("osc:client");

import * as dgram from "dgram";
import { Socket } from "dgram";
import { EventEmitter } from "events";

import { MessageHandler, ErrorHandler } from "./handler";

import { State, MessageType, TypeValue } from "./enums";
import { msg, CallAndResponse } from "supercolliderjs";

import { toBuffer } from "osc-min";


export class Client extends EventEmitter {

  port: Socket;
  options: ServerOptions;

  private _id: number;
  private msg_handler: MessageHandler;
  private error_handler: ErrorHandler;

  private _ready: Promise<number>;

  constructor(options: ServerOptions) {
    super();
    this.options = options;
    this.port = dgram.createSocket("udp4");

    this.msg_handler = new MessageHandler(this.port);
    this.error_handler = new ErrorHandler(this.port);

    this.port.on("listening", (): void => {
      debug(`listening`);
    });

    this.port.on("close", (): void => {
      debug(`close`);
    });

    this._connect();
  }

  private _connect(): void  {
    this._send(msg.notify(State.ON)).then((): void => {
      this.msg_handler.once("/notify", (response: Array<TypeValue>): void => {
        const [ id, total ] = response;
        debug(`connected as client id ${id.value} from ${total.value} maxLogins`);
        this._id = id.value;
        this.emit("ready");
      });
    });
  }

  private _send(msg: CallAndResponse): Promise < number > {
    const [ address, ...args ] = msg.call;
    return new Promise<number>((resolve, reject) => {
      this.port.send(
        toBuffer({
          oscType: MessageType.message,
          address,
          args
        }),
        this.options.remote_port,
        this.options.remote_address,
        (error: Error, bytes: number): void => {
          if (error) {
            return reject(error);
          }
          return resolve(bytes);
        }
      );
    });
  }
}

export type ServerOptions  = {
  remote_address: string;
  remote_port: number;
};
