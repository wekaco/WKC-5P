const debug = require('debug')('osc:osc-min');
const dgram = require('dgram');
const { msg } = require('supercolliderjs');

const osc = require('osc-min');

const buf = ([address, ...args ], oscType = 'message') => osc.toBuffer({
  oscType,
  address,
  args
});

const REMOTE_ADDRESS = "127.0.0.1";
const REMOTE_PORT = 57110;

const port =  dgram.createSocket('udp4');

let { call }  = msg.status();
let b = buf(call);

port.on('message', (message) => {
  debug(`Receiced message:${osc.fromBuffer(message)}`);
});

port.send(b, 0, b.length, REMOTE_PORT, REMOTE_ADDRESS, (err) => {
  if (err) {
    debug(`Send error ${err}`);
  }
});
