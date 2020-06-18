import { EnvironmentState } from './environment-state';
import { Environment } from './environment-class';

export const environment = new Environment(
    new EnvironmentState({
        production: true,
        api: 'https://entelect-extension-webserver.herokuapp.com/'
    })
);
