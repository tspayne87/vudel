import { ValidationFunction } from '../interfaces';

export const checkRegex: ValidationFunction<any, any, 'regex'> = <V, T>(val: V, item: T, options?: RegExp) => {
  if (val === null || val === undefined || options === undefined) return false;
  return options.test((val as any).toString());
}