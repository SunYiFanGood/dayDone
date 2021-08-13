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