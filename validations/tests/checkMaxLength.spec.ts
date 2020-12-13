import { checkMaxLength } from '../src';
import { expect } from 'chai';

describe('checkMaxLength tests', () => {
  it('basic usage', async () => {
    expect(checkMaxLength('1', { }, 5)).to.eq(true);
    expect(checkMaxLength('12', {}, 1)).to.eq(false);
    expect(checkMaxLength('123', {}, 1)).to.eq(false);
    expect(checkMaxLength('1234', {}, 4)).to.eq(true);
    expect(checkMaxLength('12345', {}, 10)).to.eq(true);
    expect(checkMaxLength(['1', '2', '3', '4', '5', '6'], {}, 5)).to.eq(false);

    expect(checkMaxLength('123', {})).to.eq(false);
  });
});