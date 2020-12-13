import { watch } from 'vue';
import { FieldOptions } from '@vudel/core';

export function addDefaults<T extends object>(fields: FieldOptions<T>[]): void {
  function fieldsChange(fields: FieldOptions<T>[]) {
    for(let i = 0; i < fields.length; ++i) {
      switch(fields[i].type) {
        case 'email':
          // Set up the label for the field
          if (fields[i].label === undefined) fields[i].label = 'Email';

          // Set the default validations for emails
          const validations = fields[i].validations || {};
          if (validations.require === undefined) validations.require = {};
          if (validations.email === undefined) validations.email = {};
          fields[i].validations = validations;
          break;
        case 'password':
          // Set up the label for the field
          if (fields[i].label === undefined) fields[i].label = 'Password';

          // Set the default validations for password
          const passwordValidation = fields[i].validations || {};
          if (passwordValidation.require === undefined) passwordValidation.require = {};
          fields[i].validations = passwordValidation;
          break;
      }
    }
  }

  // Watch the fields array to get changes and update the validations based on them
  watch(fields, fieldsChange, { immediate: true, deep: true });
}