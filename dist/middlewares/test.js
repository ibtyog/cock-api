"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test_middleware = test_middleware;
function test_middleware(req, res, next) {
    console.log("this is middleware");
    next();
}
;
