import { ExcludeMethods } from './Builder';

export type ClassProperties<T extends object> = {
  [K in keyof ExcludeMethods<T>]?: ExcludeMethods<T>[K];
};
