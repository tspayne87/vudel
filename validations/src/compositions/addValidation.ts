import { reactive, watchEffect, watch } from 'vue';
import { FieldSet, FieldOptions } from '@vudel/core';
import { Validator, ValidationFieldItem, ValidationType, ValidatorOptions } from '../interfaces';
import { Validations } from '../validations';

/**
 * Using function to watch the state and check the validations of that state
 * 
 * @param initialState The initial state of the object we want to validate
 */
export function addValidation<T extends object>(fieldSet: FieldSet<T>): Validator<T> {
  const validations = reactive({}) as Record<string, string[]>;
  const fieldItems: ValidationFieldItem<T>[] = [];

  /**
   * Helper method to process a message before sending into the user
   * 
   * @param message The message we should process before saving the message
   * @param val The value that is being validated to make sure everything is good
   */
  function processMessage<T, V>(message: string, val: V, options: any) {
    if (options === undefined || options === null) options = '';
    if (Array.isArray(options)) {
      options = '(' + options.map(x => x.toString()).join(', ') + ')';
    }
    return message.replace('{options}', options.toString());
  }

  /**
   * Helper method to determine if this field is valid or not, will not contain a messages if valid
   * 
   * @param field The field that we are validating
   * @param fieldItem The options that should be passed to the validation fields
   */
  function isValid<K>(obj: K, name: keyof K, validationOptions: ValidationType<T>) {
    const messages = [];
    const val = obj === undefined ? undefined : obj[name];

    const validations = Object.keys(validationOptions) as (keyof ValidationType<T>)[];
    for(let i = 0; i < validations.length; ++i) {
      const options = (typeof validationOptions[validations[i]] === 'string' || validationOptions[validations[i]] === null ?
        { message: validationOptions[validations[i]] } : validationOptions[validations[i]]) as ValidatorOptions<T, keyof ValidationType<T>>;

      const validation = Validations.getValidation(validations[i]);
      if (!validation.callback(val, fieldSet.data, options.options as any)) {
        messages.push(processMessage(options.message || validation.message, val, options.options));
      }
    }
    return messages;
  }

  /**
   * Recursive function that is meant to add validation issues to the list of validations for processing.
   * 
   * @param prefix The current prefix we are working with, this always needs to have the . in front of it so we can prepend it
   * @param name The flattened name of the object we are validating, ex: foo.bar.foo
   * @param obj The current object we are working with since this is a recursive function the obj will need to tag along
   * @param options The options that should be used for validation
   */
  function handleValidations(prefix: string, name: string, obj: any, options: ValidationType<T>) {
    let index = -1;
    while((index = name.indexOf('.')) > -1) {
      const key = name.substr(0, index);
      name = name.substr(index + 1);
      if (obj !== undefined) {
        obj = obj[key];
      }
      prefix = `${prefix}${key}.`;

      if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; ++i) {
          handleValidations(`${prefix}{${i}}.`, name, obj[i], options);
        }
        return;
      }
    }
    validations[`${prefix}${name}`] = isValid(obj, name, options);
  }

  /**
   * Helper method to add a field and update the validation information
   * 
   * @param name The name of the field being added
   * @param options The validation options that are being used for this field
   */
  function addField(name: string, options: ValidationType<T>) {
    const item = { name, options, handle: () => { } };
    item.handle = watchEffect(() => {
      handleValidations('', name, fieldSet.data, options);
    });
    fieldItems.push(item);
  }

  /**
   * Recursive method is meant to make a flattend set of fields based on the field object given
   * 
   * @param fields The fields we need to flatten into a single array to calculate validations
   */
  function flattenFields(fields: FieldOptions<any>[]) {
    const result: Record<string, ValidationType<T>> = {};
    for (let i = 0; i < fields.length; ++i) {
      const key = fields[i].name;
      const validations = fields[i].validations;
      if (validations) {
        result[key] = validations;
      }

      const children = fields[i].children;
      if (children) {
        const resultFields = flattenFields(children);
        const keys = Object.keys(resultFields);
        for (let j = 0; j < keys.length; ++j) {
          result[`${key}.${keys[j]}`] = resultFields[keys[j]];
        }
      }
    }
    return result;
  }

  /**
   * Helper keep the internals up to date so that validations are kept intact
   * 
   * @param fields The new fields that are being set to the fields area
   */
  function fieldsChange(fields: FieldOptions<T>[]) {
    const flattened = flattenFields(fields as FieldOptions<any>[]);
    const keys = Object.keys(flattened);

    const toRemove = fieldItems.filter(x => keys.findIndex(y => y === x.name) === -1);
    for (let i = 0; i < toRemove.length; ++i) {
      const index = fieldItems.indexOf(toRemove[i]);
      toRemove[i].handle();
      fieldItems.splice(index, 1);
      delete validations[toRemove[i].name];
    }

    // Add/Update
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const watchIndex = fieldItems.findIndex(x => x.name === key);
      if (watchIndex > -1) {
        // We need to check the validations to determine if we are updating the previous value
        // or removing the validation check because no validations exist
        if (flattened[key]) {
          fieldItems[watchIndex].options = flattened[key];
        } else {
          fieldItems[watchIndex].handle();
          fieldItems.splice(watchIndex, 1);
          delete validations[toRemove[i].name];
        }
      } else if (flattened[key]) {
        addField(key, flattened[key]);
      }
    }
  }

  // Watch the fields array to get changes and update the validations based on them
  watch(fieldSet.fields, fieldsChange, { immediate: true, deep: true });

  // Return the object that we want to process
  return { validations };
}