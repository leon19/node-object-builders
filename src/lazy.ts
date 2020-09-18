/**
 * Wraps a class to be used lazily. This could be helpful when using class
 *
 * @example Using the `new` operator
 *
 * ```ts
 * import { lazy } from '@lleon/object-builders';
 *
 * class User {
 *   name = 'John';
 * }
 *
 * const lazyUser = lazy(() => User);
 *
 * // the `lazyUser` can only been invoked when the original class has already been evaluated
 * // it will throw an error if it is not
 * const user = new (lazyUser())();
 *
 * console.log(user instanceof User); // prints `true`
 * console.log(user.name); // prints `"John"`
 * ```
 *
 * @example Using `Object.create`
 *
 * ```ts
 * import { lazy } from '@lleon/object-builders';
 *
 * class User {
 *   name = 'John';
 * }
 *
 * const lazyUser = lazy(() => User);
 *
 * // the prototype is only accessible if the original class has already been evaluated
 * // it will throw an error if it is not
 * const user = Object.create(lazyUser.prototype);
 *
 * console.log(user instanceof User); // prints `true`
 * console.log(user.name); // prints undefined because `Object.create` does not invoke the class constructor
 * ```
 *
 * @param lazyConstructor
 */
export function lazy<T extends object, Args extends any[], Class extends { new (...args: Args): T }>(lazyConstructor: () => Class): Class {
  const lazyClass: Class = function (...args: Args) {
    const ctor = lazyConstructor();

    return new ctor(...args);
  } as any;

  // use a trap for everything but for construct
  // because our function already handle hat
  return new Proxy(lazyClass, {
    get(target: Class, p: string | number | symbol, receiver: any): any {
      const ctor = lazyConstructor();

      return Reflect.get(ctor, p, receiver);
    },
    /* istanbul ignore next */
    set(target: Class, p: string | number | symbol, value: any, receiver: any): boolean {
      const ctor = lazyConstructor();

      return Reflect.set(ctor, p, value, receiver);
    },
    /* istanbul ignore next */
    apply(target: Class, thisArg: any, argArray?: any): any {
      const ctor = lazyConstructor();

      return Reflect.apply(ctor, thisArg, argArray);
    },
    /* istanbul ignore next */
    defineProperty(target: Class, p: string | number | symbol, attributes: PropertyDescriptor): boolean {
      const ctor = lazyConstructor();

      return Reflect.defineProperty(ctor, p, attributes);
    },
    /* istanbul ignore next */
    deleteProperty(target: Class, p: string | number | symbol): boolean {
      const ctor = lazyConstructor();

      return Reflect.deleteProperty(ctor, p);
    },
    /* istanbul ignore next */
    enumerate(): PropertyKey[] {
      const ctor = lazyConstructor();

      return [...Reflect.enumerate(ctor)];
    },
    /* istanbul ignore next */
    getOwnPropertyDescriptor(target: Class, p: string | number | symbol): PropertyDescriptor | undefined {
      const ctor = lazyConstructor();

      return Reflect.getOwnPropertyDescriptor(ctor, p);
    },
    /* istanbul ignore next */
    has(target: Class, p: string | number | symbol): boolean {
      const ctor = lazyConstructor();

      return Reflect.has(ctor, p);
    },
    /* istanbul ignore next */
    isExtensible(): boolean {
      const ctor = lazyConstructor();

      return Reflect.isExtensible(ctor);
    },
    /* istanbul ignore next */
    ownKeys(): PropertyKey[] {
      const ctor = lazyConstructor();

      return Reflect.ownKeys(ctor);
    },
    /* istanbul ignore next */
    preventExtensions(): boolean {
      const ctor = lazyConstructor();

      return Reflect.preventExtensions(ctor);
    },
    /* istanbul ignore next */
    getPrototypeOf(): object | null {
      const ctor = lazyConstructor();

      return Reflect.getPrototypeOf(ctor);
    },
    /* istanbul ignore next */
    setPrototypeOf(target: Class, v: any): boolean {
      const ctor = lazyConstructor();

      return Reflect.setPrototypeOf(ctor, v);
    }
  });
}
