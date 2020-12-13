import { Validators } from './Validators';

export interface ValidatorOptions<T, K extends keyof Validators<T, keyof T>> {
  message?: string;
  options?: Validators<T, keyof T>[K];
}