import logger  = require("debug");
const debug = logger("osc:handler");

import { fromBuffer } from "osc-min";

export default (message: Buffer) => {
  const { address, args, oscType } = fromBuffer(message);
  debug(`${oscType} ${address} ${JSON.stringify(args)}`);
};
