import express = require('express');
import { Routing } from './routing';

export class LinkRepoRouting extends Routing {
    constructor() {
        super();
        const router = express.Router();

        console.log('Initializing LinkRepo routing...');

        this.get('/link-repo', this.getLinks);
    }

    private getLinks(request: express.Request, response: express.Response) {
        console.log('Getting links')
        response.send(['Value1', 'Value2', 'This is my awesome link'])
    }
}

// const express = require('express');
// const router = new express.Router();

// router.get('/tasks/:id', async (req, res) => {
//     res.send('Hello world!')
// });