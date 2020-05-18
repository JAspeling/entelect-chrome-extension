import { environment } from '../environments/environment';
import chalk from 'chalk';

export const noop: () => void = () => void {};

export function isNullOrUndefined(object: any): boolean {
    return isNull(object) || isUndefined(object);
}

export function isNullOrWhitespace(object: any | string): boolean {
    return isNullOrUndefined(object) || (object as string).trim() === '';
}

export function isNull(object: any): boolean {
    return object === null;
}

export function isUndefined(object: any): boolean {
    return object === undefined;
}


export function logError(message?: any, ...optionalParams: any[]) {
    if (!environment.production && !isNullOrUndefined(message)) {
        if (optionalParams?.length > 0) {
            console.log(`${chalk.red('[ERROR]')} ${message}`, optionalParams);
        } else {
            console.log(`${chalk.red('[ERROR]')} ${message}`);
        }
    }
}

export function logDebug(message?: any, ...optionalParams: any[]) {
    if (!environment.production && !isNullOrUndefined(message)) {
        if (optionalParams?.length > 0) {
            console.log(`${chalk.green('[DEBUG]')} ${message}`, optionalParams);
        } else {
            console.log(`${chalk.green('[DEBUG]')} ${message}`);
        }
    }
} 

export function logInfo(message?: any, ...optionalParams: any[]) {
    if (!environment.production && !isNullOrUndefined(message)) {
        if (optionalParams?.length > 0) {
            console.log(`${chalk.blue('[INFO] ')} ${message}`, optionalParams);
        } else {
            console.log(`${chalk.blue('[INFO] ')} ${message}`);
        }
    }
}