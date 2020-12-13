import { useDataSource } from '../src';
import { expect } from 'chai';
import { KeyValuePair, mock1, mock2, mock3 } from './mocks';
import { wait } from './util';

describe('useDataSource tests', () => {
  function checkArray(left: KeyValuePair[], right: KeyValuePair[]) {
    for (let i = 0; i < left.length; ++i) {
      expect(left[i].key).to.eq(right[i].key);
      expect(left[i].value).to.eq(right[i].value);
    }
  }

  it('basic usage', async () => {
    const dataSource = await useDataSource(() => mock1);
    checkArray(dataSource.data, mock1);
  });

  it('paging usage', async () => {
    const dataSource = await useDataSource<KeyValuePair>((options) => {
      let items: KeyValuePair[] = [];
      switch(options.page) {
        case 1:
          items = mock1;
          break;
        case 2: 
          items = mock2;
          break;
        case 3:
          items = mock3;
          break;
      }

      return { items, total: mock1.length + mock2.length + mock3.length };
    });

    let check = mock1;
    checkArray(dataSource.data, check);

    await dataSource.nextPage();
    check = check.concat(mock2);
    checkArray(dataSource.data, check);

    await dataSource.nextPage();
    check = check.concat(mock3);
    checkArray(dataSource.data, check);
  });

  it('filter usage', async () => {
    const dataToCheck = mock1.concat(mock2).concat(mock3);
    const dataSource = await useDataSource<KeyValuePair>((options) => {
      return dataToCheck.filter(x => {
        if (options.filters.length === 0) return true;
        for (let i = 0; i < options.filters.length; ++i) {
          switch(options.filters[i].operator || 'eq') {
            case 'eq': if (options.filters[i].value !== x[options.filters[i].field]) return false; break;
            case 'gt': if (options.filters[i].value <= x[options.filters[i].field]) return false; break;
            case 'gte': if (options.filters[i].value < x[options.filters[i].field]) return false; break;
            case 'lt': if (options.filters[i].value >= x[options.filters[i].field]) return false; break;
            case 'lte': if (options.filters[i].value > x[options.filters[i].field]) return false; break;
            case 'ne': if (options.filters[i].value === x[options.filters[i].field]) return false; break;
            case 'contains': if (x[options.filters[i].field].toString().indexOf(options.filters[i].value) === -1) return false; break;
          }
        }
        return true;
      });
    });

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
    const dataSource = await useDataSource<KeyValuePair>((options) => {
      if (options.order.length === 0) return dataToCheck;

      return dataToCheck.slice(0, dataToCheck.length)
        .sort((a, b) => {
          if (options.order[0].direction === 'desc') return a[options.order[0].field] > b[options.order[0].field] ? -1 : 1;
          return a[options.order[0].field] > b[options.order[0].field] ? 1 : -1;
        });
    });

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