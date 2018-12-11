import logger  = require("debug");
import { MessageType } from "./enums";
import { toBuffer } from "osc-min";

export default (call: Array<string>, oscType: MessageType): Buffer  => {
  const [ address, ...args ] = call;
  return toBuffer({
    oscType,
    address,
    args
  });
};
