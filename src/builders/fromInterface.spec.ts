import { expect } from 'chai';
import { anyFunction, reset, spy, verify } from 'ts-mockito';
import * as builder from '../makeBuilder';
import { fromInterface } from './fromInterface';

describe('fromInterface()', () => {
  let spiedBuilder: typeof builder;

  beforeEach(() => (spiedBuilder = spy(builder)));
  afterEach(() => reset(spiedBuilder));

  it('should call makeBuilder()', () => {
    getTestBuilder();

    verify(spiedBuilder.makeBuilder(anyFunction())).once();
  });

  it('get and build should return the same object', () => {
    const builder = getTestBuilder().testProperty.set('foo');

    expect(builder.get()).to.be.deep.equal(builder.build());
  });
});

interface Test {
  testProperty?: string;
}

function getTestBuilder() {
  return fromInterface<Test>();
}
