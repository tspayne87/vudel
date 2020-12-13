import { checkMinLength } from '../src';
import { expect } from 'chai';

describe('checkMinLength tests', () => {
  it('basic usage', async () => {
    expect(checkMinLength('1', { }, 1)).to.eq(true);
    expect(checkMinLength('12', {}, 3)).to.eq(false);
    expect(checkMinLength('123', {}, 10)).to.eq(false);
    expect(checkMinLength('1234', {}, 4)).to.eq(true);
    expect(checkMinLength('12345', {}, 2)).to.eq(true);
    expect(checkMinLength(['1', '2', '3', '4', '5', '6'], {}, 5)).to.eq(true);

    expect(checkMinLength('123', {})).to.eq(false);
  });
});