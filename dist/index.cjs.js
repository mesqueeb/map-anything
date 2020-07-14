'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Map each value of an object with provided function, just like `Array.map`
 *
 * @template T
 * @param {T} target
 * @param {(value: T, index?: number, array?: any[]) => any} mapFunction
 * @returns {object}
 */
function mapObject(target, mapFunction) {
    return Object.entries(target).reduce(function (carry, _a, index, array) {
        var key = _a[0], value = _a[1];
        carry[key] = mapFunction(value, index, array);
        return carry;
    }, {});
}

exports.mapObject = mapObject;
