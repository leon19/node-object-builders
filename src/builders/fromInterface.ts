import { Builder } from '../types/Builder';
import { makeBuilder } from '../makeBuilder';

export function fromInterface<Properties extends object>(): Builder<Properties, Properties> {
  return makeBuilder(properties => properties as Properties);
}
