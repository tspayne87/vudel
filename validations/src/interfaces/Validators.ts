export interface Validators<T, K extends keyof T> {
  email: undefined;
  require: undefined;
  minLength: number;
  maxLength: number;
  regex: RegExp;
  contains: T[K][];
}