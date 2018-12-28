const test = require('tape');
const sinon = require('sinon');

const { toBuffer } = require("osc-min");

const { Client } = require("../../dist/src/client");
const { EventEmitter } = require("events");

const options = { remote_address: '127.0.0.1', remote_port: 57110 };

test("Client(port, {}) should emit error when trying to connect", assert => {
  assert.plan(1);
  const expected = new Error('error');

  const mock_port = new EventEmitter();
  mock_port.send = sinon.stub();
  mock_port.send.yields(expected);

  const client = new Client(mock_port, options);
  client.once("error", actual => {
    assert.equals(actual, expected);
  });
});

test("Client(port, {}) should buble error from socket", assert => {
  assert.plan(1);
  const expected = new Error('socket error');

  const mock_port = new EventEmitter();
  mock_port.send = sinon.stub();
  mock_port.send.yields(null, 16);

  const client = new Client(mock_port, options);
  client.once("error", actual => {
    assert.equals(actual, expected);
  });
  mock_port.emit("error", expected);
});

test("Client(port, {}) should emit ready when connected", assert => {
  assert.plan(1);
  const expected = 1;

  const mock_port = new EventEmitter();
  mock_port.send = sinon.stub();
  mock_port.send.yields(null, 16);

  const client = new Client(mock_port, options);
  client.once("ready", (actual) => {
    assert.equals(actual, expected);
  });
  mock_port.emit("message", toBuffer({ address: "/done", oscType: "message", args: [ "/notify", expected, 32 ] }));
});
