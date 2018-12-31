import logger = require("debug");
const debug = logger("osc:buffer_map");

import { Client } from "./client";
import { msg, Call, CallAndResponse, Pair } from "supercolliderjs";
import { TypeValue } from "./enums";

const bufferToPairs = (buf: Buffer): Array<Pair> =>  Array.from(buf.entries())
  .map(([ frame, value ]) => [ frame, value * 0.00392156862745098 ]);

export class BufferMap {

  private _client: Client;

  private _offset: number;

  constructor(client: Client, options: BufferMapOptions) {
    this._client = client;
    this._offset = options.offset || 0;
  }

  public set(buf: Buffer): Promise<number> {
    return this._client.callAndResponse(msg.bufferAlloc(this._offset++, buf.length, 1, []))
      .then((alloc: Array<TypeValue>): Promise<number> => {
        const [ { value } ] = alloc;
        debug(`allocated buffer ${value}`);
        return this._client.call(msg.bufferSet(value, bufferToPairs(buf)));
      });
  }
}

export type BufferMapOptions = {
  offset: number;
};
