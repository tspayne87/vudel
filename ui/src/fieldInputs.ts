import { DefineComponent } from 'vue';
import { FieldCollection, FieldType } from './interfaces';
import { NumberInput, TextInput, TextareaInput, PasswordInput, EmailInput } from './components';

export class FieldInputs {
  private static _fields: FieldCollection = {
    text: TextInput,
    textarea: TextareaInput,
    number: NumberInput,
    email: EmailInput,
    password: PasswordInput
  };

  public static setField(key: FieldType, component: DefineComponent) {
    this._fields[key] = component;
  }

  public static getField(key: FieldType): DefineComponent | null {
    return this._fields[key] ?? null;
  }
}