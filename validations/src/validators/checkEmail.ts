import { ValidationFunction } from '../interfaces';

export const checkEmail: ValidationFunction<any, any, 'email'> = <V, T>(val: V, item: T) => {
  if (typeof val === 'string') {
    return val.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/) !== null;
  }
  return false;
}