// eslint-disable-next-line max-classes-per-file
import { expect } from 'chai';
import { lazy } from './lazy';

describe('lazy()', () => {
  it('should be instantiable using new', () => {
    const lazyTest = lazy(() => Test);

    const testPropertyValue = 'test';

    class Test {
      testProperty = testPropertyValue;
    }

    const test = new lazyTest();

    expect(test).to.be.instanceOf(Test);
    expect(test.testProperty).to.be.equal(testPropertyValue);
  });

  it('should be instantiable using Object.create', () => {
    const lazyTest = lazy(() => Test);

    const testPropertyValue = 'test';

    class Test {
      testProperty = testPropertyValue;
    }

    const test = Object.create(lazyTest.prototype);

    expect(test).to.be.instanceOf(Test);
    expect(test.testProperty).to.be.undefined;
  });

  it('should throw an error when the original class is not defined yet', () => {
    const lazyTest = lazy(() => Test);
    expect(() => {
      new lazyTest();
    }).to.throw(ReferenceError);

    const testPropertyValue = 'test';

    class Test {
      testProperty = testPropertyValue;
    }
  });
});
