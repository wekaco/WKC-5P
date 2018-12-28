const test = require('tape');
const sinon = require('sinon');
const { toBuffer } = require("osc-min");

const { Client } = require("../../dist/src/client");

const dgram = require("dgram");
const mock_port = dgram.createSocket("udp4");

const stub_send = sinon.stub(mock_port, "send");

const options = { remote_address: '127.0.0.1', remote_port: 57110 };

test("Client(port, {}) should emit error when trying to connect", assert => {
  assert.plan(1);
  const expected = new Error('error');
  stub_send.yields(expected);
  const client = new Client(mock_port, options);
  client.once("error", actual => {
    assert.equals(actual, expected);
  });
});

test("Client(port, {}) should emit ready when connected", assert => {
  assert.plan(1);
  const client = new Client(mock_port, options);
  client.once("ready", () => {
    assert.equals(client.id, 1);
  });
  stub_send.yields(null, 16);// random byte number
  mock_port.emit("message", toBuffer({ address: "/done", oscType: "message", args: [ "/notify", 1, 32 ] }));
});
