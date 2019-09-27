import { makeBuilder } from '../makeBuilder';
import { Builder } from '../types/Builder';

export function fromFactory<Properties extends object, Result>(
  factory: (properties: Partial<Properties>) => Result
): Builder<Properties, Result> {
  return makeBuilder(factory);
}
