import { Builder } from '../types/Builder';
import { fromFactory } from './fromFactory';

export function fromClassConstructor<Instance extends object, Properties extends object>(classConstructor: {
  new (properties: Properties): Instance;
}): Builder<Properties, Instance> {
  return fromFactory(properties => new classConstructor(properties as Properties));
}
