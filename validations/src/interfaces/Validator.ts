import { UndefinedRecord } from './Types';

export interface Validator<T> {
  validations: Record<string, string[]>;
}