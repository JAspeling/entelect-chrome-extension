import express = require('express');
import { LinkRepoRouting } from './routing/link-routing';
import { Mongoose } from './database/mongoose';
import { Server } from 'http';
import { logDebug } from './shared/utility-functions';

export class Main {
    app: express.Application;
    port: number;

    constructor() {
        this.app = express();

        this.app.use(express.json()) 

        this.port = +process.env.PORT || 8000;

        this.initProxy()
        this.initRoutes();
    }

    public async run(): Promise<void> {
        await this.connectToDatabase().catch(err => {
            console.error('Unable to connect to the database', err);
        });
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