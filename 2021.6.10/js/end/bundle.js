(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./module1":2,"./module2":3,"./module3":4,"./module4":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var name = "syf";
//默认导出
exports.default = name;
},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//分别导出
var obj = exports.obj = {
    name: "m2"
};
},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//一次导出
function fn1() {
    console.log("m3");
}
var m3 = [1, 3, 5, 6, 6, 4, 5, "m3"];
exports.fn1 = fn1;
exports.m3 = m3;
},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
//多种方式混合导出
var m4 = "m4";
function fn2() {
    console.log("m4");
}
exports.default = m4;
var arr = exports.arr = [2, 5, 8, 8, 5, 6, 4, "m4"];
exports.fn2 = fn2;
},{}]},{},[1]);
