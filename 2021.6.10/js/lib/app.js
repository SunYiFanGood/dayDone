"use strict";

var _module = require("./module1");

var _module2 = _interopRequireDefault(_module);

var _module3 = require("./module2");

var _module4 = require("./module3");

var _module5 = require("./module4");

var _module6 = _interopRequireDefault(_module5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_module2.default);
console.log(_module3.obj);
console.log(_module4.m3);
(0, _module4.fn1)();
console.log(_module6.default, _module5.arr);
(0, _module5.fn2)();