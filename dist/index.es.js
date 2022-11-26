/**
 * Map each value of an object with provided function, just like `Array.map`
 */
function mapObject(target, mapFunction) {
    return Object.entries(target).reduce((carry, [key, value], index, array) => {
        carry[key] = mapFunction(value, key, array);
        return carry;
    }, {});
}
/**
 * Map each value of a map with provided function, just like `Array.map`
 */
function mapMap(target, mapFunction) {
    return [...target.entries()].reduce((carry, [key, value], index, array) => {
        carry.set(key, mapFunction(value, key, array));
        return carry;
    }, new Map());
}

export { mapMap, mapObject };
