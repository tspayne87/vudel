import { checkRequired } from '../src';
import { expect } from 'chai';

describe('checkRegex tests', () => {
  it('basic usage', async () => {
    expect(checkRequired(null, { })).to.eq(false);
    expect(checkRequired(undefined, { })).to.eq(false);
    expect(checkRequired([], {})).to.eq(false);
    expect(checkRequired('', { })).to.eq(false);

    expect(checkRequired(['test something'], {})).to.eq(true);
    expect(checkRequired('something in here', { })).to.eq(true);
  });
});