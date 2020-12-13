import { checkContains } from '../src';
import { expect } from 'chai';

describe('checkContains tests', () => {
  it('basic usage', async () => {
    expect(checkContains('test', { }, ['test'])).to.eq(true);
    expect(checkContains('test', {})).to.eq(false);
    expect(checkContains('test', {}, ['Not', 'In', 'Here'])).to.eq(false);
    expect(checkContains('test', {}, ['Not', 'In', 'Here', 'test', 'test'])).to.eq(true);
    expect(checkContains('test', {}, [])).to.eq(false);
  });
});