import { EnvironmentState } from './environment-state';
import { Environment } from './environment-class';

export const environment = new Environment(
    new EnvironmentState({
        production: false,
        api: 'https://entelect-extension-webserver.herokuapp.com/'
    })
);
