import { EnvironmentState } from './environment-state';

export class Environment {
    public production: boolean = false;

    constructor(public state: EnvironmentState) { }
}