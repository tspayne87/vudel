import { FieldType, FieldTypeWithOptions } from './interfaces';

declare module '@vudel/core/types/interfaces/fieldSet' {
  interface FieldOption<T, K extends keyof T> {
    type: FieldType | FieldTypeWithOptions;
    label?: string;
    placeholder?: string;
  }
}