import { DatabaseSettings } from '../core/environment/database-settings';
import { Environment } from '../core/environment/environment-class';
import { EnvironmentState } from '../core/environment/environment-state';

export const environment = new Environment(
    new EnvironmentState({
        production: false,
        database: new DatabaseSettings({
            protocol: process.env.mongoDb_protocol || 'mongodb://',
            host: process.env.mongoDb_host || '127.0.0.1',
            port: process.env.mongoDb_port || '27017',
            database: process.env.mongoDb_database || 'entelect-extension-dev'
        })
    })
);
