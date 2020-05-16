"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.LinkRepoRouting = void 0;
var express = require("express");
var routing_1 = require("./routing");
var LinkRepoRouting = /** @class */ (function (_super) {
    __extends(LinkRepoRouting, _super);
    function LinkRepoRouting() {
        var _this = _super.call(this) || this;
        var router = express.Router();
        console.log('Initializing LinkRepo routing...');
        _this.get('/link-repo', _this.getLinks);
        return _this;
    }
    LinkRepoRouting.prototype.getLinks = function (request, response) {
        console.log('Getting links');
        response.send(['Value1', 'Value2', 'This is my awesome link']);
    };
    return LinkRepoRouting;
}(routing_1.Routing));
exports.LinkRepoRouting = LinkRepoRouting;
// const express = require('express');
// const router = new express.Router();
// router.get('/tasks/:id', async (req, res) => {
//     res.send('Hello world!')
// });
