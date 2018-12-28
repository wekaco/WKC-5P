const test = require("tape");
const { toBuffer } = require("osc-min");

const { MessageHandler } = require("../../dist/src/handlers");

const{ EventEmitter } = require("events");
const mock_port = new EventEmitter();

test("MessageHandler should handle plain OSC messages", assert => {
  assert.plan(2);
  const handler = new MessageHandler(mock_port);
  handler.once("/just", (args, type) => {
    assert.equals(type, "message");
    assert.deepEquals(args, [ { type: 'string', value: 'a' }, { type: 'string', value: 'message' } ]);
  });
  const plain_msg = toBuffer({ address: "/just", oscType: "message", args: [ "a", "message" ] });
  mock_port.emit("message", plain_msg);
});

test("MessageHandler should buble /done OSC messages", assert => {
  assert.plan(4);
  const handler = new MessageHandler(mock_port);
  handler.once("/done", (args, type) => {
    assert.equals(type, "message");
    assert.deepEquals(args, [
      { type: 'string', value: '/just' },
      { type: 'string', value: 'a' },
      { type: 'string', value: 'message' }
    ]);
  });
  handler.once("/just", (args, type) => {
    assert.equals(type, "message");
    assert.deepEquals(args, [
      { type: 'string', value: 'a' },
      { type: 'string', value: 'message' }
    ]);
  });
  const plain_msg = toBuffer({ address: "/done", oscType: "message", args: [ "/just", "a", "message" ] });
  mock_port.emit("message", plain_msg);
});
