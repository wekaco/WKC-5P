import { State } from "../../enums";

declare module "supercolliderjs" {
  const msg: MessageHelper;
  export interface MessageHelper {
    bufferSet(bufferID: number, pairs: Array<Pair>): Call;
    bufferAlloc(bufferID: number, numFrames: number, numChannels: number, completionMsg: Call): CallAndResponse;
    notify(state: State): CallAndResponse;
  }
  export interface CallAndResponse {
    call: Call;
    response: Call;
  }
  export type Pair = Array<number>;
  export type Call = Array<string>;
}
