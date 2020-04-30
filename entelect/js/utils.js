const isNullOrUndefined = (value) => {
    return value == null || value == undefined;
}

const containsOneOf = (value, strings, ignoreCase = true) => {
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