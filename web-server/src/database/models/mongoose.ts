import mongoose = require('mongoose');
import express = require('express');
import { environment } from '../../environments/environment';

export class Mongoose {
    connectionString: string;

    public connect(): Promise<typeof mongoose> {
        this.connectionString = environment.state.database.build();
        console.log(`connecting to database via [${this.connectionString}] ...`);
       // mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-e4bst.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        
        return mongoose.connect(this.connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }); 
    } 
}