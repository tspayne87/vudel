import { useArrayDataSource } from '../src';
import { expect } from 'chai';
import { KeyValuePair, mock1, mock2, mock3 } from './mocks';
import { wait } from './util';

describe('useArrayDataSource tests', () => {
  function checkArray(left: KeyValuePair[], right: KeyValuePair[]) {
    for (let i = 0; i < left.length; ++i) {
      expect(left[i].key).to.eq(right[i].key);
      expect(left[i].value).to.eq(right[i].value);
    }
  }

  it('basic usage', async () => {
    const dataSource = await useArrayDataSource(mock1);
    checkArray(dataSource.data, mock1);
  });

  it('filter usage', async () => {
    const dataToCheck = mock1.concat(mock2).concat(mock3);
    const dataSource = await useArrayDataSource(dataToCheck);

    checkArray(dataSource.data, dataToCheck);


    dataSource.options.filters.push({ field: 'key', value: 'ultrices' });
    await wait();
    checkArray(dataSource.data, dataToCheck.filter(x => x.key === 'ultrices'));

    dataSource.options.filters = []
    await wait();
    checkArray(dataSource.data, dataToCheck);

    dataSource.options.filters.push({ field: 'value', value: 'lec', operator: 'gte' });
    await wait();
    checkArray(dataSource.data, dataToCheck.filter(x => x.value <= 'lec'));

    dataSource.options.filters.splice(0, dataSource.options.filters.length);
    await wait();
    checkArray(dataSource.data, dataToCheck);

    dataSource.options.filters.push({ field: 'key', operator: 'ne', value: 'Lorem ipsum' });
    dataSource.options.filters.push({ field: 'value', operator: 'contains', value: 'lo' });
    await wait();
    checkArray(dataSource.data, dataToCheck.filter(x => x.key !== 'Lorem ipsum' && x.value.indexOf('lo') > -1));
  });

  it('sort usage', async () => {
    const dataToCheck = mock1.concat(mock2).concat(mock3);
    const dataSource = await useArrayDataSource(dataToCheck);

    dataSource.options.order.push({ field: 'key' });
    await wait();
    checkArray(dataSource.data, dataToCheck.slice(0, dataToCheck.length).sort((a, b) => a.key > b.key ? 1 : -1));

    dataSource.options.order = [];
    await wait();
    checkArray(dataSource.data, dataToCheck);

    dataSource.options.order.push({ field: 'value', direction: 'desc' });
    await wait();
    checkArray(dataSource.data, dataToCheck.slice(0, dataToCheck.length).sort((a, b) => a.value > b.value ? -1 : 1));

    dataSource.options.order.splice(0, dataSource.options.order.length);
    await wait();
    checkArray(dataSource.data, dataToCheck);
  });
});