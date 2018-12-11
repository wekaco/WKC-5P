import { MessageType } from "../../enums";

declare module "osc-min" {

  export interface Bundle {
    oscType: MessageType;
    elements: Array<Bundle|Message>;
    timetag: Array<number>;
  }
  export interface Message {
    address: string;
    args: Array<Array<Args>|Args|string>;
    oscType: MessageType;
  }
  export interface Args {
    type: string;
    value: string | number | object;
  }
  export function fromBuffer(b: Buffer, strict?: Boolean): Message;
  export function fromBuffer(b: Buffer, strict?: Boolean): Bundle;
  export function toBuffer(b: Bundle, strict?: Boolean): Buffer;
  export function toBuffer(b: Message, strict?: Boolean): Buffer;
}
