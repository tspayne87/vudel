import { reactive } from 'vue';
import { FieldOptions, FieldSet } from '../interfaces/fieldSet';

/**
 * Using function to watch the state and check the validations of that state
 * 
 * @param initialState The initial state of the object we want to validate
 */
export function useFieldSet<T extends object>(initialState: T): FieldSet<T> {
  /**
   * The data we are working with
   */
  const data = reactive(initialState) as T;

  /**
   * The fields that this field set has, this is where configuration for the fields will occur
   */
  const fields = reactive([]) as FieldOptions<T>[];

  // Return the object that we want to process
  return { data, fields };
}