import { Schema, Model, Document } from 'mongoose';
import { Mongoose } from '../mongoose';
import { logDebug } from '../../shared/utility-functions';

export class LinkDatabaseModel {

    schema: Schema;
    name: string = 'Link';
    static Model: Model<Document, {}>;

    constructor() {
        this.schema = new Schema({
            url: {
                type: String,
                required: true,
                trim: true
            },
            title: {
                type: String,
                required: true,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true
            },
            image: {
                type: String,
                required: false,
                trim: true
            },
        });
    }

    public modelSchema(): Promise<Model<Document>> {
        return new Promise((resolve, reject) => {
            try {
                logDebug(`Modelling [${this.name}]`);
                LinkDatabaseModel.Model = Mongoose.model(this.name, this.schema);
                resolve(LinkDatabaseModel.Model)
            } catch (error) {
                console.error('Failed to model the schema', error)
                reject(error);
            }
        })
    }
}
