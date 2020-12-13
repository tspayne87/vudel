import { Component, DefineComponent } from 'vue';
import { FieldTypeOptions } from './FieldTypeOptions';

export type FieldType = 'text' | 'textarea' | 'number' | 'email' | 'password' | 'fieldList' | 'fieldSet';
export type FieldTypeWithOptions = { [P in keyof FieldTypeOptions]?: FieldTypeOptions[P]; }
export type FieldCollection = { [P in FieldType]?: DefineComponent };