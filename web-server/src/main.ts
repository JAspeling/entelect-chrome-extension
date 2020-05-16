import express = require('express');
import { LinkRepoRouting } from './routing/link-repo';
import { Mongoose } from './database/mongoose';

// const express = require('express');
// const bodyParser = require('body-parser');
// const timeout = require('connect-timeout');

require('./routing/link-repo');


export class Main {
    app: express.Application;
    port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.initProxy()
        this.initRoutes();
        this.connectToDatabase();
    }

    initProxy() {
        process.env['HTTP_PROXY'] = 'http://bc-vip.intra.absa.co.za:8080';
        process.env['HTTPS_PROXY'] = 'http://bc-vip.intra.absa.co.za:8080';
    }

    private initRoutes(): void {
        console.log('Initializing application Routes...');

        this.app.use(new LinkRepoRouting().router)
    }

    public run(): void {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }

    private connectToDatabase() {
        new Mongoose().connect().then(() => {
            console.log('Connected to database!')
        }).catch(error => {
            console.error(error)
        })
    }
}

const main = new Main();
main.run();