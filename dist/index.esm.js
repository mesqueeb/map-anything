/**
 * Map each value of an object with provided function, just like `Array.map`
 *
 * @template T
 * @param {T} target
 * @param {(value: T, propName: keyof T, array: T[keyof T][]) => any} mapFunction
 * @returns {Record<string, any>}
 */
function mapObject(target, mapFunction) {
    return Object.entries(target).reduce(function (carry, _a, index, array) {
        var key = _a[0], value = _a[1];
        carry[key] = mapFunction(value, key, array);
        return carry;
    }, {});
}

export { mapObject };
