import { NonMethodKeys } from './Builder';

export type ClassProperties<T extends object> = {
  [K in NonMethodKeys<T>]?: T[K];
};
