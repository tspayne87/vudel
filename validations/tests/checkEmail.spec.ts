import { checkEmail } from '../src';
import { expect } from 'chai';

describe('checkEmail tests', () => {
  it('basic usage', async () => {
    expect(checkEmail('test@email.com', { })).to.eq(true);
    expect(checkEmail('test@@email.com', {})).to.eq(false);
    expect(checkEmail('test@email@email.com', {})).to.eq(false);
    expect(checkEmail('testing-this@emails.com', {})).to.eq(true);
    expect(checkEmail('test', {})).to.eq(false);
  });
});