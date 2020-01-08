/**
 * Map each value of an object with provided function, just like `Array.map`
 *
 * @export
 * @param {object} target
 * @param {(value: any, index?: number, array?: any[]) => any} mapFunction
 * @returns {object}
 */
export function mapObject (
  target: object,
  mapFunction: (value: any, index?: number, array?: any[]) => any
): object {
  return Object.entries(target).reduce((carry, [key, value], index, array) => {
    carry[key] = mapFunction(value, index, array)
  }, {})
}
