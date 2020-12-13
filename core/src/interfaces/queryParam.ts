import { Operator } from './types';
import { FilterParam } from './filterParam';
import { OrderParam } from './orderParam';

export interface DataSourceQueryParams<T> {
  operator: Operator;
  filters: FilterParam<T>[];

  order: OrderParam<T>[];
  pageSize: number;
}

export interface QueryParams<T> extends DataSourceQueryParams<T> {
  page: number;
}
