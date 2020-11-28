type NonMethodKeys<T> = { [P in keyof T]: T[P] extends Function ? never : P }[keyof T];

type Setters<T, R> = { [K in NonMethodKeys<T> & string as `set${Capitalize<K>}`]: (value: T[K]) => Builder<T, R> };
type Removers<T, R> = { [K in NonMethodKeys<T> & string as `unset${Capitalize<K>}`]: () => Builder<T, R> };

export type Builder<Properties, Result> = Setters<Properties, Result> &
  Removers<Properties, Result> & { build(): Result; get(): Partial<Properties> };
