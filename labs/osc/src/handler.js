"use strict";
exports.__esModule = true;
var logger = require("debug");
var debug = logger("osc:handler");
var osc_1 = require("osc");
exports["default"] = (function (message) {
    var _a = osc_1.fromBuffer(message), address = _a.address, args = _a.args, oscType = _a.oscType;
    debug(oscType + " " + address + " " + JSON.stringify(args));
});
