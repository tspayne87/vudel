import { QueryParams } from '../interfaces';
import { useDataSource } from './useDataSource';

/**
 * Wrapper composition to allow for easier use of data sources with just an array object
 * 
 * @param dataSource The data source array that should be used for this data source
 * @param defaultOptions The default options that should be used for this data source
 */
export async function useArrayDataSource<T>(dataSource: T[], defaultOptions?: QueryParams<T>) {
  const { data, options } = await useDataSource<T>((options) => {
    let result = dataSource;

    // Process the filter and filter out the items that should not be in the array
    if (options.filters.length > 0) {
      result = result.filter(x => {
        for (let i = 0; i < options.filters.length; ++i) {
          switch(options.filters[i].operator || 'eq') {
            case 'eq': if (options.filters[i].value !== x[options.filters[i].field]) return false; break;
            case 'gt': if (options.filters[i].value <= x[options.filters[i].field]) return false; break;
            case 'gte': if (options.filters[i].value < x[options.filters[i].field]) return false; break;
            case 'lt': if (options.filters[i].value >= x[options.filters[i].field]) return false; break;
            case 'lte': if (options.filters[i].value > x[options.filters[i].field]) return false; break;
            case 'ne': if (options.filters[i].value === x[options.filters[i].field]) return false; break;

            // The contains should only be a string operator so we will deal with it as such
            case 'contains': if ((x[options.filters[i].field] as any).toString().indexOf(options.filters[i].value.toString()) === -1) return false; break;
          }
        }
        return true;
      });
    }

    // Process the order that the array should be in
    if (options.order.length > 0) {
      result = result.slice(0, result.length)
        .sort((a, b) => {
          let dir = 0;
          for (let i = 0; i < options.order.length; ++i) {
            if (options.order[0].direction === 'desc') dir += a[options.order[0].field] > b[options.order[0].field] ? -1 : 1;
            else dir = a[options.order[0].field] > b[options.order[0].field] ? 1 : -1;
          }
          return Math.sign(dir);
        });
    }

    // Get the paginated version of the array passed in
    return result.slice((options.page - 1) * options.pageSize, options.page * options.pageSize);
  }, defaultOptions);

  // Return just the data and options since nextPage is not needed in this context
  return { data, options };
}