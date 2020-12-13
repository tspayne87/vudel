import { ValidationType } from './interfaces';

declare module '@vudel/core/types/interfaces/fieldSet' {
  interface FieldOption<T, K extends keyof T> {
    validations?: ValidationType<T>;
  }
}