import express = require('express');

import { logInfo } from '../shared/utility-functions';
import { Router } from 'express';

export class Routing {
    router: express.Router;

    constructor() {
        this.router = express.Router();
    }

    get<T>(url: string, callback: (req, res) => void): void {
        logInfo(`Initializing [GET] on ${url}`)
        this.router.get(url, callback);
    }

    // post<>(url: string, ): Router {
    //     return this.router.post(url, this.newMethod);
    // }

    // private newMethod(req, res) {
    // }
}