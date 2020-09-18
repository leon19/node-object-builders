import { expect } from 'chai';
import { deepEqual, reset, spy, verify } from 'ts-mockito';
import * as builder from '../makeBuilder';
import { fromFactory } from './fromFactory';

describe('fromFactory()', () => {
  let spiedBuilder: typeof builder;
  let spiedFactory: typeof factoryWrapper;

  beforeEach(() => {
    spiedBuilder = spy(builder);
    spiedFactory = spy(factoryWrapper);
  });

  afterEach(() => {
    reset(spiedBuilder);
    reset(spiedFactory);
  });

  it('should call fromFactory()', () => {
    getTestBuilder();

    verify(spiedBuilder.makeBuilder(factoryWrapper.factory)).once();
  });

  describe('#get()', () => {
    it('should return a plain object with the set properties', () => {
      const value = 'foo';
      const test = getTestBuilder().testInputProperty.set(value).get();

      expect(test).to.not.be.instanceOf(TestResult);
      expect(test.testInputProperty).to.be.equal(value);
    });
  });

  describe('#build()', () => {
    it('should return a class instance with the set properties', () => {
      const value = 'foo';
      const builder = getTestBuilder().testInputProperty.set(value);
      const test = builder.build();

      verify(spiedFactory.factory(deepEqual(builder.get()))).once();

      expect(test).to.be.instanceOf(TestResult);
      expect(test.testResultProperty).to.be.equal(value);
    });
  });
});

interface TestInput {
  testInputProperty: string;
}

class TestResult {
  constructor(readonly testResultProperty?: string) {}
}

const factoryWrapper = {
  factory(input: Partial<TestInput>): TestResult {
    return new TestResult(input.testInputProperty);
  }
};

function getTestBuilder() {
  return fromFactory(factoryWrapper.factory);
}
