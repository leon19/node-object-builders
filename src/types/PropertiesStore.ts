import { StorableProperty } from './StorableProperty';

export type PropertiesStore<Properties extends object> = {
  [key in keyof Properties]?: StorableProperty<Properties>;
};
