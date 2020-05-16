"use strict";
exports.__esModule = true;
exports.Routing = void 0;
var express = require("express");
var Routing = /** @class */ (function () {
    function Routing() {
        this.router = express.Router();
    }
    Routing.prototype.get = function (url, callback) {
        console.log("Initializing [GET] on " + url);
        this.router.get(url, callback);
    };
    return Routing;
}());
exports.Routing = Routing;
