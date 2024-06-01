/**
 * Map each value of an object with provided function, just like `Array.map`
 */
export function mapObject(target, mapFunction) {
    return Object.entries(target).reduce((carry, [key, value], index, array) => {
        carry[key] = mapFunction(value, key, array);
        return carry;
    }, {});
}
/**
 * Map each value of an object with provided function, just like `Array.map`
 */
export async function mapObjectAsync(target, mapFunction) {
    const entries = Object.entries(target);
    const promises = entries.map(async ([key, value]) => {
        const newValue = await mapFunction(value, key, target);
        return [key, newValue];
    });
    const results = await Promise.all(promises);
    return results.reduce((carry, [key, value]) => {
        carry[key] = value;
        return carry;
    }, {});
}
/**
 * Map each value of a map with provided function, just like `Array.map`
 */
export function mapMap(target, mapFunction) {
    return [...target.entries()].reduce((carry, [key, value], index, array) => {
        carry.set(key, mapFunction(value, key, array));
        return carry;
    }, new Map());
}
