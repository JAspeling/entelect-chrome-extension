import { isNullOrUndefined, isNullOrWhitespace } from '../../shared/utility-functions';
import { Dict } from '../dictionary.interface';

export class DatabaseSettings {
    constructor(init?: Partial<DatabaseSettings>) {
        Object.assign(this, init);
    }

    public protocol: string;// = process.env.mongoDb_protocol || 'mongodb+srv://';
    public username: string;// = process.env.mongoDb_user || 'admin';
    public password: string;// = process.env.mongoDb_pass || 'admin'
    public host: string;// = process.env.mongoDb_host || 'cluster0-e4bst.mongodb.net';
    public port: string;// = process.env.mongoDb_host || '';
    public database: string;// = process.env.mongoDb_database || 'chrome-extensions';
    public options: Dict<string>;

    public build(): string {
        let result: string = this.protocol;

        if (!isNullOrUndefined(this.username) && !isNullOrUndefined(this.password)) {
            result += `${this.username}:${this.password}@`;
        }

        result += this.host;

        if (!isNullOrWhitespace(this.port)) {
            result += `:${this.port}`;
        }

        result += `/${this.database}`;

        if (!isNullOrUndefined(this.options)) {
            result += '?';
            Object.keys(this.options).forEach(key => {
                result += `${key}=${this.options[key]}`;
            })
        }

        return result;
    }
}