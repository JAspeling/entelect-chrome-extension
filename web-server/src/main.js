"use strict";
exports.__esModule = true;
exports.Main = void 0;
var express = require("express");
var link_repo_1 = require("./routing/link-repo");
var mongoose_1 = require("./database/mongoose");
// const express = require('express');
// const bodyParser = require('body-parser');
// const timeout = require('connect-timeout');
require('./routing/link-repo');
var Main = /** @class */ (function () {
    function Main() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.initProxy();
        this.initRoutes();
        this.connectToDatabase();
    }
    Main.prototype.initProxy = function () {
        process.env['HTTP_PROXY'] = 'http://bc-vip.intra.absa.co.za:8080';
        process.env['HTTPS_PROXY'] = 'http://bc-vip.intra.absa.co.za:8080';
    };
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
    Main.prototype.connectToDatabase = function () {
        new mongoose_1.Mongoose().connect().then(function () {
            console.log('Connected to database!');
        })["catch"](function (error) {
            console.error(error);
        });
    };
    return Main;
}());
exports.Main = Main;
var main = new Main();
main.run();
