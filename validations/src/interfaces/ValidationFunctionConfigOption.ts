import { Validators } from './Validators';
import { ValidationFunction } from './Types';

export interface ValidationFunctionConfigOption<T, P extends keyof Validators<T, keyof T>> {
  callback: ValidationFunction<any, any, P>;
  message: string;
}
