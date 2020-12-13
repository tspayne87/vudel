import { ValidationFunction } from '../interfaces';

export const checkMaxLength: ValidationFunction<any, any, 'maxLength'> = <V, T>(val: V, item: T, options?: number) => {
  if (val === null || val === undefined || options === undefined) return false;
  return (Array.isArray(val) && val.length <= options) ||
    (typeof val === 'string' && val.length <= options);
}