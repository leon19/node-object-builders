import { Property } from './Property';
import { Builder } from './Builder';

export interface StorableProperty<Properties extends object> extends Property<Builder<Properties, unknown>, unknown> {
  value?: unknown;
}
