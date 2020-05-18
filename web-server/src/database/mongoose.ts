import mongoose = require('mongoose');
import { environment } from '../environments/environment';
import { logDebug } from '../shared/utility-functions';
import { LinkDatabaseModel } from './models/link-model';

export class Mongoose {
    connectionString: string;

    public connect(): Promise<typeof mongoose> {
        this.connectionString = environment.state.database.build();
        logDebug(`connecting to database via [${this.connectionString}] ...`);
        // mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-e4bst.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        return new Promise(async (resolve, reject) => {

            try {
                const connection = await mongoose.connect(this.connectionString, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                });

                logDebug('Connected!')
                resolve(connection);
            } catch (error) {
                reject(error);
            }
        });
    }

    public applyModels(): void {
        new LinkDatabaseModel().modelSchema();
    }

    public static model(modelName: string, schema: mongoose.Schema): mongoose.Model<mongoose.Document, {}> {
        return mongoose.model(modelName, schema);
    }
}
