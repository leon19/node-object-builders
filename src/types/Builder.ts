export type ExcludeMethods<T> = { [P in keyof T as T[P] extends Function ? never : P]: T[P] };

export type Setters<T, R> = {
  [K in keyof ExcludeMethods<T> & string as `set${Capitalize<K>}`]: (value: ExcludeMethods<T>[K]) => Builder<T, R>;
};
export type Removers<T, R> = { [K in keyof ExcludeMethods<T> & string as `unset${Capitalize<K>}`]: () => Builder<T, R> };

export type Builder<Properties, Result> = Setters<Properties, Result> &
  Removers<Properties, Result> & { build(): Result; get(): Partial<Properties> };
