export const noop: () => void = () => void {};

export function isNullOrUndefined(object: any) {
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