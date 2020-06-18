export const noop: () => void = () => void {};

export function isNullOrUndefined(value: any): boolean {
    return value == null || value == undefined;
}

export function containsOneOf(value: string, strings: string[], ignoreCase: boolean = true) {
    let target = value;

    target = ignoreCase ? target.toLocaleUpperCase() : target;
    if (!strings || strings.length === 0) {
        return false;
    }

    strings = strings.map((str) => {
        return ignoreCase ? str.toLocaleUpperCase() : str;
    });
    for (const str of strings) {
        if (target.includes(str)) {
            return true;
        }
    }

    return false;
};

export function setStorage<T>(key: string, data: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        var obj: any = {};
        obj[key] = data;
        chrome.storage.sync.set(obj, () => {
            resolve(data);
        })
    });
}
