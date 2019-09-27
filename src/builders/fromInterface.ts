import { makeBuilder } from '../makeBuilder';
import { Builder } from '../types/Builder';

export function fromInterface<Properties extends object>(): Builder<Properties> {
  return makeBuilder(properties => properties as Properties);
}
