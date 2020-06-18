import { EnvironmentState } from './environment-state';
import { Environment } from './environment-class';

export const environment = new Environment(
    new EnvironmentState({
        production: false,
        api: 'http://localhost:8000/'
    })
);
