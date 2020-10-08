/**
 * Map each value of an object with provided function, just like `Array.map`
 *
 * @template T
 * @param {T} target
 * @param {(value: T, index?: number, array?: any[]) => any} mapFunction
 * @returns {Record<string, any>}
 */
export function mapObject<
  T extends Record<string, any>,
  MapFunction extends (value: T[keyof T], index?: number, array?: T[keyof T][]) => any
>(
  target: T,
  mapFunction: MapFunction
): { [key in keyof T]: ReturnType<typeof mapFunction> } {
  return Object.entries(target).reduce((carry, [key, value], index, array) => {
    carry[key as keyof T] = mapFunction(value, index, (array as unknown) as T[keyof T][])
    return carry
  }, {} as { [key in keyof T]: ReturnType<typeof mapFunction> } )
}
