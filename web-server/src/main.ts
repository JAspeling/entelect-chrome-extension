import express = require('express');
import { LinkRepoRouting } from './routing/link-repo';

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

        this.initRoutes();
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
}

const main = new Main();
main.run();