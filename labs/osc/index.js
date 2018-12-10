const osc = require('osc');
const debug = require('debug')('osc:index');

const localAddress = "0.0.0.0";
const localPort = 57121;

const remoteAddress = "127.0.0.1";
const remotePort = 57110;

const metadata = true;

const port = new osc.UDPPort({
  localAddress,
  localPort,
  metadata,
});
 
// Listen for incoming OSC bundles.
port.on("bundle", (bundle, timestamp, info) => {
  debug(`An OSC bundle just arrived for time tag ${timestamp}:${bundle}`);
  debug(`Remote info is : ${info}`);
});
 
// Open the socket.
port.open();
 
 
// When the port is read, send an OSC message to, say, SuperCollider
port.on("ready", () => {
  debug(`port ready`);
  port.send({
    address: "/s_new",
    args: [
      {
        type: "s",
        value: "default"
      },
      {
        type: "i",
        value: 100
      }
    ]
  }, remoteAddress, remotePort);
});
