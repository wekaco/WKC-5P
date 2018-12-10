const debug = require('debug')('osc:index');
const dgram = require('dgram');

const port = dgram.createSocket('udp4');

const handler = require('./handler');
const buf = require('./msg');

const { msg } = require('supercolliderjs');


const REMOTE_ADDRESS = "127.0.0.1";
const REMOTE_PORT = 57110;
port.on('message', handler);

/**
let numFrames = 32;
let numChannels = 1;
**/

for(let bufferID=0;bufferID<4;bufferID++) {
  let call = msg.bufferSet(bufferID, [ 
    [ 0, 0.2],
    [ 1, 0.3],
    [ 7, 1],
  ]);
  let b = buf(call);

  port.send(b, REMOTE_PORT, REMOTE_ADDRESS, (err) => {
    if (err) {
      debug(`Send error ${err}`);
    }
  });
}
