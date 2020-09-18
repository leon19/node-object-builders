import { expect } from 'chai';
import { anyFunction, reset, spy, verify } from 'ts-mockito';
import { fromClassObject } from './fromClassObject';
import * as builder from './fromFactory';

describe('fromClassObject()', () => {
  let spiedBuilder: typeof builder;

  beforeEach(() => (spiedBuilder = spy(builder)));
  afterEach(() => reset(spiedBuilder));

  it('should call fromFactory()', () => {
    getTestBuilder();

    verify(spiedBuilder.fromFactory(anyFunction())).once();
  });

  describe('#get()', () => {
    it('should return a plain object with the set properties', () => {
      const value = 'foo';
      const test = getTestBuilder().testProperty.set(value).get();

      expect(test).to.not.be.instanceOf(Test);
      expect(test.testProperty).to.be.equal(value);
    });
  });

  describe('#build()', () => {
    it('should return a class instance with the set properties', () => {
      const value = 'foo';
      const test = getTestBuilder().testProperty.set(value).build();

      expect(test).to.be.instanceOf(Test);
      expect(test.testProperty).to.be.equal(value);
    });
  });
});

class Test {
  testProperty?: string;
}

function getTestBuilder() {
  return fromClassObject(Test);
}
