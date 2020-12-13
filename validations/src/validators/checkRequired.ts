import { ValidationFunction } from '../interfaces';

export const checkRequired: ValidationFunction<any, any, 'require'> = <V, T>(val: V, item: T) => {
  return (Array.isArray(val) && val.length > 0) ||
    (typeof val === 'string' && val.length > 0);
}