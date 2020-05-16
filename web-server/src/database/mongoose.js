"use strict";
exports.__esModule = true;
exports.Mongoose = void 0;
var mongoose = require("mongoose");
var Mongoose = /** @class */ (function () {
    function Mongoose() {
        this.protocol = 'mongodb+srv://';
        this.username = 'admin';
        this.password = 'Zaq1@wsx';
        this.host = '@cluster0-e4bst.mongodb.net';
        this.database = 'chrome-extensions';
        this.connectionUrl = "" + this.protocol + this.username + ":" + this.password + this.host + ":/" + this.database + "?retryWrites=true&w=majority";
    }
    // "mongodb+srv://admin:<password>@cluster0-e4bst.mongodb.net/test?retryWrites=true&w=majority"
    Mongoose.prototype.connect = function () {
        console.log('connecting to database...');
        var username = 'admin';
        var password = 'admin';
        // mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-e4bst.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        return mongoose.connect("mongodb+srv://admin:admin@cluster0-e4bst.mongodb.net/chrome-extensions?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            user: 'admin',
            pass: 'admin',
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    };
    return Mongoose;
}());
exports.Mongoose = Mongoose;
