import { Builder } from '../types/Builder';
import { ClassProperties } from '../types/ClassProperties';
import { fromFactory } from './fromFactory';

export function fromClassObject<T extends object>(classConstructor: { new (...args: any[]): T }): Builder<ClassProperties<T>, T> {
  return fromFactory(properties => {
    const instance = Object.create(classConstructor.prototype);

    return Object.assign(instance, properties);
  });
}
