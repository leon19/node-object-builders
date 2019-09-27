/**
 * @internal
 * @hidden
 */
export function mapValues<T extends object>(target: T, mapper: (val: any, key: keyof T) => any): { [K in keyof T]: any } {
  const result = {} as { [K in keyof T]: any };
  const entries = Object.entries(target) as Array<[keyof T, any]>;

  // TODO: use `Object.fromEntries` when targeting node >= 12
  entries.forEach(([key, val]) => (result[key] = mapper(val, key)));

  return result;
}
