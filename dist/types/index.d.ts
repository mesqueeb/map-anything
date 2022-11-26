/**
 * Map each value of an object with provided function, just like `Array.map`
 */
export declare function mapObject<T extends Record<string | number | symbol, unknown>, MapFunction extends (value: T[keyof T], propName: keyof T, array: T[keyof T][]) => any>(target: T, mapFunction: MapFunction): {
    [key in keyof T]: ReturnType<typeof mapFunction>;
};
export declare type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;
export declare type ValueOfMap<M extends Map<unknown, unknown>> = M extends Map<unknown, infer V> ? V : never;
/**
 * Map each value of a map with provided function, just like `Array.map`
 */
export declare function mapMap<T extends Map<unknown, unknown>, MapFunction extends (value: ValueOfMap<T>, propName: KeyOfMap<T>, array: ValueOfMap<T>[]) => any>(target: T, mapFunction: MapFunction): Map<KeyOfMap<T>, ReturnType<typeof mapFunction>>;