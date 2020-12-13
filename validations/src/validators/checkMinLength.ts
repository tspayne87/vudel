import { ValidationFunction } from '../interfaces';

export const checkMinLength: ValidationFunction<any, any, 'minLength'> = <V, T>(val: V, item: T, options?: number) => {
  if (val === null || val === undefined || options === undefined) return false;
  return (Array.isArray(val) && val.length >= options) ||
    (typeof val === 'string' && val.length >= options);
}