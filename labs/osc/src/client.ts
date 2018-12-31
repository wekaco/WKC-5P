import logger = require("debug");
const debug = logger("osc:client");

import { Socket } from "dgram";
import { EventEmitter } from "events";

import { MessageHandler  } from "./handlers";

import { State, MessageType, TypeValue } from "./enums";
import { msg, Call, CallAndResponse } from "supercolliderjs";

import { toBuffer } from "osc-min";


export class Client extends EventEmitter {

  port: Socket;
  options: ServerOptions;

  private _id: number;
  private msg_handler: MessageHandler;

  private _ready: Promise<number>;

  constructor(port: Socket, options: ServerOptions) {
    super();
    this.options = options;
    this.port = port;

    this.msg_handler = new MessageHandler(this.port);

    this.port.on("error", (err: Error) => {
      this.emit("error", err);
    });
    this.port.on("listening", (): void => {
      debug(`listening`);
    });
    this.port.on("close", (): void => {
      debug(`close`);
    });

    this._connect().catch((err: Error) => {
      this.emit("error", err);
    });
  }

  private _connect(): Promise<any>  {
    return this.callAndResponse(msg.notify(State.ON)).then((response: Array<TypeValue>): void => {
      const [ { value }, total ] = response;
      debug(`connected as client id ${value} from ${total.value} maxLogins`);
      this._id = value;
      this.emit("ready", this._id);
    });
  }

  public callAndResponse(msg: CallAndResponse): Promise <Array<TypeValue>> {
    const { call, response } = msg;
    return new Promise<Array<TypeValue>>((resolve, reject) => {
      const listener = (response: Array<TypeValue>): void => resolve(response);
      const [ _, eventName ] = response;
      this.msg_handler.once(eventName, listener);
      this.call(call).catch((err: Error): void => reject(err));
    });
  }

  public call(msg: Call): Promise <number> {
    const [ address, ...args ] = msg;
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
