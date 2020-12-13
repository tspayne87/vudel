import { ConditionalOperator } from './types';

export interface FilterParam<T> {
  field: keyof T;
  operator?: ConditionalOperator;
  value: any;
}
