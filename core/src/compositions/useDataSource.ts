import { reactive, watch } from 'vue';
import { QueryParams, SearchResult, DataSourceQueryParams } from '../interfaces';

/**
 * Composition to deal with a data source object in a standardised way
 * 
 * @param getData Callback function to get a collection of data or a search result set that will be used in this data source
 * @param defaultOptions The default options that should be used for this data source
 */
export async function useDataSource<T>(getData: (options: QueryParams<T>) => SearchResult<T> | T[] | Promise<SearchResult<T>> | Promise<T[]>, defaultOptions?: QueryParams<T>) {
  // The current data that has been loaded for this dataset
  const data = reactive([]) as T[];

  // The options that are currently available for this data source that can be changed
  const options = reactive(defaultOptions || { pageSize: 50, filters: [], order: [], operator: 'and' } as DataSourceQueryParams<T>) as DataSourceQueryParams<T>;

  // The check to see if we can go to the next page
  let hasNext = true;

  // The current page that we are on
  let currentPage = 1;

  /**
   * Helper method to start a search and reset the data for the data source
   * 
   * @param newOptions The options that were changed while watching the options
   */
  async function search(page: number, newOptions: DataSourceQueryParams<T>) {
    currentPage = page;
    const result = await Promise.resolve(getData({ page, ...newOptions }));
    if (Array.isArray(result)) {
      data.splice(0, data.length, ...result);
      hasNext = false;
    } else {
      data.splice(0, page === 1 ? data.length : 0, ...result.items);
      hasNext = result.items.length >= result.total;
    }
  }

  /**
   * Helper function to get the next dataset if needed
   */
  async function nextPage() {
    if (hasNext) {
      await search(currentPage + 1, options);
    }
  }

  // Watch on the options to check if stuff changes and do a research on it to clear the data we have because
  // the data coming in could be incorrect
  watch(options, search.bind(null, 1), { deep: true });

  // Do the first search so we can check against stuff
  await search(1, options);

  // return the data, options and nextPage function to deal with gathering data
  return { data, options, nextPage };
}