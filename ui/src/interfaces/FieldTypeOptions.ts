import { FieldType } from './Types';

export interface FieldTypeOptions { }

export interface TextFieldOptions extends FieldTypeOptions { }

export interface PasswordOptions extends FieldOptionsMap { }

export interface TextareaFieldOptions extends FieldTypeOptions {
  rows: number;
}

export interface NumberFieldOptions extends FieldTypeOptions {
  precision: number;
}

export interface FieldOptionsMap extends Record<FieldType, FieldTypeOptions> {
  text: TextFieldOptions;
  textarea: TextareaFieldOptions;
  number: NumberFieldOptions;
  password: PasswordOptions;
}