declare module "supercolliderjs" {
  const msg: MessageHelper;
  export interface MessageHelper {
    bufferSet(bufferID: number, pairs: Array<Pair>): Array<string>;
  }
  export interface CallAndResponse {
    call: Array<string>;
    response: Array<string>;
  }
  export type Pair = Array<number>;
  export type Call = Array<string>;
}
