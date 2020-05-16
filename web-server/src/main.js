"use strict";
exports.__esModule = true;
exports.Main = void 0;
var express = require("express");
var link_repo_1 = require("./routing/link-repo");
// const express = require('express');
// const bodyParser = require('body-parser');
// const timeout = require('connect-timeout');
require('./routing/link-repo');
var Main = /** @class */ (function () {
    function Main() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.initRoutes();
    }
    Main.prototype.initRoutes = function () {
        console.log('Initializing application Routes...');
        this.app.use(new link_repo_1.LinkRepoRouting().router);
    };
    Main.prototype.run = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server listening on port " + _this.port);
        });
    };
    return Main;
}());
exports.Main = Main;
var main = new Main();
main.run();
