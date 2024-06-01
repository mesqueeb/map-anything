/**
 * Map each value of an object with provided function, just like `Array.map`
 */
export function mapObject<
  T extends { [key in string | number | symbol]: unknown },
  MapFunction extends (value: T[keyof T], propName: keyof T, array: T[keyof T][]) => any,
>(target: T, mapFunction: MapFunction): { [key in keyof T]: ReturnType<typeof mapFunction> } {
  return Object.entries(target).reduce(
    (carry, [key, value], index, array) => {
      carry[key as keyof T] = mapFunction(value as any, key, array as T[keyof T][])
      return carry
    },
    {} as { [key in keyof T]: ReturnType<typeof mapFunction> },
  )
}

/**
 * Map each value of an object with provided function, just like `Array.map`
 */
export async function mapObjectAsync<
  T extends { [key in string | number | symbol]: unknown },
  MapFunction extends (value: T[keyof T], propName: keyof T, array: T[keyof T][]) => Promise<any>,
>(
  target: T,
  mapFunction: MapFunction,
): Promise<{ [key in keyof T]: Awaited<ReturnType<typeof mapFunction>> }> {
  const entries = Object.entries(target) as [keyof T, T[keyof T]][]
  const promises = entries.map(async ([key, value]) => {
    const newValue = await mapFunction(value, key, target as any)
    return [key, newValue]
  })
  const results = await Promise.all(promises)
  return results.reduce(
    (carry, [key, value]) => {
      carry[key as keyof T] = value
      return carry
    },
    {} as { [key in keyof T]: Awaited<ReturnType<MapFunction>> },
  )
}

// map utilities
export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never
export type ValueOfMap<M extends Map<unknown, unknown>> =
  M extends Map<unknown, infer V> ? V : never

/**
 * Map each value of a map with provided function, just like `Array.map`
 */
export function mapMap<
  T extends Map<unknown, unknown>,
  MapFunction extends (value: ValueOfMap<T>, propName: KeyOfMap<T>, array: ValueOfMap<T>[]) => any,
>(target: T, mapFunction: MapFunction): Map<KeyOfMap<T>, ReturnType<typeof mapFunction>> {
  return [...target.entries()].reduce((carry, [key, value], index, array) => {
    carry.set(key as KeyOfMap<T>, mapFunction(value as any, key as any, array as ValueOfMap<T>[]))
    return carry
  }, new Map<KeyOfMap<T>, ReturnType<typeof mapFunction>>())
}
