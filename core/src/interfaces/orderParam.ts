import { SortDirection } from './types';

export interface OrderParam<T> {
  field: keyof T;
  direction?: SortDirection;
}
