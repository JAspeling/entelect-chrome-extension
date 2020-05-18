import express = require('express');
import { LinkRepoRouting } from './routing/link-routing';
import { Mongoose } from './database/mongoose';
import { Server } from 'http';
import { logDebug } from './shared/utility-functions';

// const express = require('express');
// const bodyParser = require('body-parser');
// const timeout = require('connect-timeout');

// require('./routing/link-repo');


export class Main {
    app: express.Application;
    port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.initProxy()
        this.initRoutes();
    }

    public async run(): Promise<void> {
        await this.connectToDatabase();
        await this.startupRestfulServer();
    }

    private initProxy() {
        process.env['HTTP_PROXY'] = 'http://bc-vip.intra.absa.co.za:8080';
        process.env['HTTPS_PROXY'] = 'http://bc-vip.intra.absa.co.za:8080';
    }

    private initRoutes(): void {
        logDebug('Initializing application Routes...');

        this.app.use(new LinkRepoRouting().router)
    }

    private async connectToDatabase(): Promise<any> {
        const mongoose = new Mongoose();
        const connection = await mongoose.connect();
        mongoose.applyModels();

        return connection;
    }

    private startupRestfulServer(): Promise<Server> {
        return new Promise((resolve, reject) => {
            try {
                this.app.listen(this.port, () => {
                    logDebug(`Server listening on port ${this.port}`);
                    resolve();
                });
            } catch (error) {
                console.error('Failed to start the restful web api:', error);
                reject(error);
            }
        })

    }
}

const main = new Main();
main.run();