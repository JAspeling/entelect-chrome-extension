import express = require('express');

import { Routing } from './routing';
import { logInfo, logDebug, logError } from '../shared/utility-functions';
import { LinkDatabaseModel } from '../database/models/link-model';
import { LinkDto } from '../database/dto/link-dto';

export class LinkRepoRouting extends Routing {
    constructor() {
        super();

        logInfo('Initializing [GET] on /links')
        this.router.get('/links', this.getLinks);

        logInfo('Initializing [POST] on /links')
        this.router.post('/links', this.addLink);
    }

    private async getLinks(request: express.Request, response: express.Response) {
        try {
            const links = await LinkDatabaseModel.Model.find({});
            response.send(links);
        } catch (error) {
            logError(error);
            response.status(404).send(error);
        }
    }

    private async addLink(request: express.Request, response: express.Response) {
        var dto = new LinkDto({ ...request.body }).validate();

        const link = new LinkDatabaseModel.Model(dto);
        try {
            await link.save();
            response.status(201).send(link);
        } catch (error) {
            logError('Failed to save the link to the database', error);
            response.status(400).send()
        }
    }
}