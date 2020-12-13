import { checkRegex } from '../src';
import { expect } from 'chai';

describe('checkRegex tests', () => {
  it('basic usage', async () => {
    expect(checkRegex('test', { }, /te/)).to.eq(true);
    expect(checkRegex('hello', { }, /te/)).to.eq(false);
  });
});