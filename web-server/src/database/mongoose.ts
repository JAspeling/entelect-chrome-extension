import mongoose = require('mongoose');
import express = require('express');

export class Mongoose {
    private protocol = 'mongodb+srv://';
    private username = 'admin';
    private password = 'Zaq1@wsx'
    private host = '@cluster0-e4bst.mongodb.net';
    private database = 'chrome-extensions';
    public readonly connectionUrl = `${this.protocol}${this.username}:${this.password}${this.host}:/${this.database}?retryWrites=true&w=majority`;
    // "mongodb+srv://admin:<password>@cluster0-e4bst.mongodb.net/test?retryWrites=true&w=majority"

    public connect(): Promise<typeof mongoose> {
        console.log('connecting to database...');
        const username = 'admin';
        const password = 'admin';
       // mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-e4bst.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        
        return mongoose.connect(`mongodb+srv://admin:admin@cluster0-e4bst.mongodb.net/chrome-extensions?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            user: 'admin',
            pass: 'admin',
            useUnifiedTopology: true,
            useCreateIndex: true
        }); 
    } 
}