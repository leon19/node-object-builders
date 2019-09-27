import { mapValues } from './helpers/mapValues';
import { Builder } from './types/Builder';
import { PropertiesStore } from './types/PropertiesStore';
import { StorableProperty } from './types/StorableProperty';

export function makeBuilder<Properties extends object, Result = Properties>(
  builderFn: (builder: Partial<Properties>) => Result,
  initialProperties: PropertiesStore<Properties> = {}
): Builder<Properties, Result> {
  // create new object in order to prevent external mutations
  initialProperties = { ...initialProperties };

  // the builder object
  const get = (): Partial<Properties> => mapValues(initialProperties, val => val!.value);
  const build = (): Result => builderFn(get());
  const builder = Object.assign(Object.create(null), { build, get });

  const builderPropertyKeys = Object.keys(builder) as PropertyKey[];
  const cloneBuilder = (properties: PropertiesStore<Properties>) => makeBuilder(builderFn, properties);

  // wrap the builder into a proxy with a get trap
  // when a property is accessed in returns a `Property` object that has the set/unset methods
  return new Proxy(builder, {
    get(target, propertyKey: keyof Properties) {
      const property = (value?: unknown): StorableProperty<Properties> => {
        const cloneProperties = (): PropertiesStore<Properties> => mapValues(initialProperties, val => property(val!.value));

        return {
          value,
          set(newValue: unknown) {
            const properties = cloneProperties();

            properties[propertyKey] = property(newValue);

            return cloneBuilder(properties);
          },
          unset() {
            const properties = cloneProperties();

            delete properties[propertyKey];

            return cloneBuilder(properties);
          }
        };
      };

      // when the result object we want to build includes a property that is also present in the builder (get and build methods)
      // we return the method with the set/unset properties assigned, so it can be used to set the property and also to call the method
      if (builderPropertyKeys.includes(propertyKey)) {
        return Object.assign(target[propertyKey], property());
      }

      return property();
    }
  });
}
