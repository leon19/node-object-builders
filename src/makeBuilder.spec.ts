import { expect } from 'chai';
import { makeBuilder } from './makeBuilder';
import { Builder } from './types/Builder';

describe('makeBuilder()', () => {
  context('immutability', () => {
    it('the properties should not be mutable from the outside', () => {
      const additionalProperty = 'foo';
      const initialProperties = {};
      const builder = makeBuilder(properties => properties, initialProperties);

      Object.assign(initialProperties, { [additionalProperty]: { value: 'bar', set: () => undefined, unset: () => undefined } });

      const result = builder.get();

      expect(result).to.not.have.property(additionalProperty);
    });

    it('should return a new builder when a property is set', () => {
      const builder = getTestBuilder();
      const builderWithProperty = builder.testProperty.set('bar');

      expect(builder).to.not.be.equal(builderWithProperty);
    });

    it('should return different result when different properties are set', () => {
      const builder = getTestBuilder();
      const builderWithProperty = builder.testProperty.set('bar');

      const result = builder.build();
      const resultWithProperty = builderWithProperty.build();

      expect(result).to.not.be.deep.equal(resultWithProperty);
    });

    it('should return a new builder when a property us unset', () => {
      const builder = getTestBuilder().testProperty.set('bar');
      const builderWithoutProperty = builder.testProperty.unset();

      expect(builder).to.not.be.equal(builderWithoutProperty);
    });

    it('should return different result when different properties are set', () => {
      const builder = getTestBuilder().testProperty.set('bar');
      const builderWithoutProperty = builder.testProperty.unset();

      const result = builder.build();
      const resultWithProperty = builderWithoutProperty.build();

      expect(result).to.not.be.deep.equal(resultWithProperty);
    });
  });

  it('should include the property when set', () => {
    const value = 'test';
    const test = getTestBuilder().testProperty.set(value).build();

    expect(test.testProperty).to.be.equal(value);
  });

  it('should include the property when it is set to undefined', () => {
    const property: keyof Test = 'testProperty';

    const test = getTestBuilder().testProperty.set(undefined).build();

    expect(test).to.have.property(property).and.is.undefined;
  });

  it('should not include the property when unset', () => {
    const value = 'test';
    const property: keyof Test = 'testProperty';

    const test = getTestBuilder().testProperty.set(value).testProperty.unset().build();

    expect(test).to.not.have.property(property);
  });

  it('should able to set a "build" property', () => {
    const value = 1;
    const builder = getTestBuildBuilder().build.set(value).build();

    expect(builder.build).to.be.equal(value);
  });

  it('should be able to unset a "build" property', () => {
    const property: keyof TestBuild = 'build';
    const value = 1;
    const builder = getTestBuildBuilder().build.set(value).build.unset().build();

    expect(builder).to.not.have.property(property);
  });

  it('should able to set a "get" property', () => {
    const value = true;
    const builder = getTestGetBuilder().get.set(value).build();

    expect(builder.get).to.be.equal(value);
  });

  it('should be able to unset a "get" property', () => {
    const property: keyof TestGet = 'get';
    const value = false;
    const builder = getTestGetBuilder().get.set(value).get.unset().build();

    expect(builder).to.not.have.property(property);
  });
});

interface Test {
  testProperty?: string;
}

function getTestBuilder(): Builder<Test> {
  return makeBuilder(properties => properties);
}

interface TestBuild extends Test {
  build?: number;
}

function getTestBuildBuilder(): Builder<TestBuild> {
  return makeBuilder(properties => properties);
}

interface TestGet extends Test {
  get?: boolean;
}

function getTestGetBuilder(): Builder<TestGet> {
  return makeBuilder(properties => properties);
}
