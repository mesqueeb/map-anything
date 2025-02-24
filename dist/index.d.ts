/** Map each value of an object with provided function, just like `Array.map` */
export declare function mapObject<T extends {
    [key in string | number | symbol]: unknown;
}, MapFunction extends (value: T[keyof T], propName: keyof T, array: T[keyof T][]) => any>(target: T, mapFunction: MapFunction): {
    [key in keyof T]: ReturnType<typeof mapFunction>;
};
/** Map each value of an object with provided function, just like `Array.map` */
export declare function mapObjectKeys<T extends {
    [key in string | number | symbol]: unknown;
}, MapFunction extends (propName: keyof T, value: T[keyof T], array: T[keyof T][]) => any>(target: T, mapFunction: MapFunction): {
    [key in ReturnType<typeof mapFunction>]: T[keyof T];
};
/** Map each value of an object with provided function, just like `Array.map` */
export declare function mapObjectAsync<T extends {
    [key in string | number | symbol]: unknown;
}, MapFunction extends (value: T[keyof T], propName: keyof T, array: T[keyof T][]) => Promise<any>>(target: T, mapFunction: MapFunction): Promise<{
    [key in keyof T]: Awaited<ReturnType<typeof mapFunction>>;
}>;
export type KeyOfMap<M extends Map<unknown, unknown>> = M extends Map<infer K, unknown> ? K : never;
export type ValueOfMap<M extends Map<unknown, unknown>> = M extends Map<unknown, infer V> ? V : never;
/** Map each value of a map with provided function, just like `Array.map` */
export declare function mapMap<T extends Map<unknown, unknown>, MapFunction extends (value: ValueOfMap<T>, propName: KeyOfMap<T>, array: ValueOfMap<T>[]) => any>(target: T, mapFunction: MapFunction): Map<KeyOfMap<T>, ReturnType<typeof mapFunction>>;
