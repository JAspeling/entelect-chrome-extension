import { DatabaseSettings } from '../core/environment/database-settings';
import { Environment } from '../core/environment/environment-class';
import { EnvironmentState } from '../core/environment/environment-state';

export const environment = new Environment(
    new EnvironmentState({
        production: false,
        // @cluster0-e4bst.mongodb.net/test?retryWrites=true&w=majority
        database: new DatabaseSettings({
            protocol: process.env.mongoDb_protocol || 'mongodb+srv://',
            username: 'admin',
            password: 'admin',
            host: process.env.mongoDb_host || 'cluster0-e4bst.mongodb.net',
            database: process.env.mongoDb_database || 'entelect-extension-dev',
            options: {
                retryWrites: "true",
                w: 'majority'
            }
        })
    })
);
