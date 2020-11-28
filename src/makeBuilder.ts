import { Builder } from './types/Builder';

export function makeBuilder<Properties extends object, Result = Properties>(
  builderFn: (builder: Partial<Properties>) => Result,
  initialProperties: Partial<Properties> = {}
): Builder<Properties, Result> {
  // create new object in order to prevent external mutations
  const properties = { ...initialProperties };

  // the builder object
  const get = (): Partial<Properties> => ({ ...properties });
  const build = (): Result => builderFn(get());
  const builder = { build, get };

  const cloneBuilder = (properties: Partial<Properties>) => makeBuilder(builderFn, properties);

  // wrap the builder into a proxy with a get trap
  // when a property is accessed in returns a `Property` object that has the set/unset methods
  return new Proxy(builder as any, {
    get(target, propertyKey: string) {
      // If the method exists in the target or if the method called is not a set/unset method
      // just call the original method
      if (typeof propertyKey !== 'string' || !/^(?:set|unset).+/.test(propertyKey)) {
        return Reflect.get(builder, propertyKey);
      }

      return (newValue: any) => {
        // de-capitalize the setProperty/unsetProperty method
        const actualPropertyName = toCamelCase(propertyKey.replace(/^set|unset/, '')) as keyof Properties;
        const newProperties = { ...properties };

        if (propertyKey.startsWith('set')) {
          newProperties[actualPropertyName] = newValue;
        } else if (propertyKey.startsWith('unset')) {
          delete newProperties[actualPropertyName];
        }

        return cloneBuilder(newProperties);
      };
    }
  });
}

function toCamelCase(property: string): string {
  return property[0].toLowerCase() + property.slice(1);
}
