import { Builder } from '../types/Builder';
import { makeBuilder } from '../makeBuilder';

export function fromFactory<Properties extends object, Result>(
  factory: (properties: Partial<Properties>) => Result
): Builder<Properties, Result> {
  return makeBuilder(factory);
}
