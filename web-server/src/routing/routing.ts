import express = require('express');

export class Routing {
    router: express.Router;

    constructor() {
        this.router = express.Router();
    }
    get<T>(url: string, callback: (req, res) => void): void {
        console.log(`Initializing [GET] on ${url}`)
        this.router.get(url, callback);
    }
}