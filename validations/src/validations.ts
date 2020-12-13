import { ValidationCollection, Validators, ValidationFunctionConfigOption } from './interfaces';
import { checkContains, checkEmail, checkMaxLength, checkMinLength, checkRegex, checkRequired } from './validators';

export class Validations {
  private static _validators: ValidationCollection<any> = {
    email: {
      callback: checkEmail,
      message: 'Please use an email'
    },
    maxLength: {
      callback: checkMaxLength,
      message: 'Must contain at less than {options}',
    },
    minLength: {
      callback: checkMinLength,
      message: 'Must contain at least {options}'
    },
    regex: {
      callback: checkRegex,
      message: 'Does not match pattern ({options})'
    },
    contains: {
      callback: checkContains,
      message: 'Must contain at least one {options}'
    },
    require: {
      callback: checkRequired,
      message: 'Field is required'
    }
  };

  public static setValidation<K extends keyof Validators<any, any>>(key: K, options: ValidationFunctionConfigOption<any, K>) {
    // TODO: Get this working properly
    (this._validators[key] as any) = options;
  }

  public static getValidation<T, V, K extends keyof Validators<any, any>>(key: K) {
    return this._validators[key];
  }
}