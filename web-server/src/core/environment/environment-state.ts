import { isNullOrUndefined } from 'util';

import { noop } from '../../shared/utility-functions';
import { DatabaseSettings } from './database-settings';

export class EnvironmentState {
    constructor(init?: Partial<EnvironmentState>) {
        Object.assign(this, init);

        this.assertVariables();
    }

    public production: boolean = null;
    public database: DatabaseSettings = null;

    private assertVariables(): void {
        const unInstantiatedVariables = this.getUnInstantiatedVariables();
        if (unInstantiatedVariables.length > 0) {
            throw new Error(`Error in Environment: The following variables need to be instantiated: [${unInstantiatedVariables.join(', ')}]`);
        }
    }

    private getUnInstantiatedVariables(): string[] {
        const unInstantiatedProperties: string[] = [];

        Object.keys(this).forEach((key: string) => isNullOrUndefined(this[key]) ? unInstantiatedProperties.push(key) : noop);

        return unInstantiatedProperties;
    }
}