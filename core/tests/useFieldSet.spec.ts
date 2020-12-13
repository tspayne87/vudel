import { useFieldSet } from '../src';
import { expect } from 'chai';

describe('useFieldSet tests', () => {
  it('basic usage', async () => {
    const obj = { username: 'Test', password: 'Hello World' };
    const { data } = useFieldSet({ username: 'Test', password: 'Hello World' });

    expect(data.username).to.eq(obj.username);
    expect(data.password).to.eq(obj.password);
  });
});