/**
 * Map each value of an object with provided function, just like `Array.map`
 *
 * @template T
 * @param {T} target
 * @param {(value: T, propName: keyof T, array: T[keyof T][]) => any} mapFunction
 * @returns {Record<string, any>}
 */
function mapObject(target, mapFunction) {
    return Object.entries(target).reduce((carry, [key, value], index, array) => {
        carry[key] = mapFunction(value, key, array);
        return carry;
    }, {});
}

export { mapObject };
