/**
 * Map each value of an object with provided function, just like `Array.map`
 *
 * @template T
 * @param {T} target
 * @param {(value: T, index?: number, array?: any[]) => any} mapFunction
 * @returns {object}
 */
export function mapObject<T extends object>(
  target: T,
  mapFunction: (value: T[keyof T], index?: number, array?: T[keyof T][]) => any
): unknown {
  return Object.entries(target).reduce((carry, [key, value], index, array) => {
    carry[key] = mapFunction(value, index, (array as unknown) as T[keyof T][])
    return carry
  }, {})
}
