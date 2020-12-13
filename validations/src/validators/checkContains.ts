import { ValidationFunction } from '../interfaces';

export const checkContains: ValidationFunction<any, any, 'contains'> = <V, T>(val: V, item: T, options?: V[]) => {
  if (options === undefined) return false;
  return options.indexOf(val) > -1;
}