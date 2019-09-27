export type ClassProperties<T extends object> = {
  [K in keyof T]?: T[K];
};
