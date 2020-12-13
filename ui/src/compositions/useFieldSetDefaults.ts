import { useFieldSet } from '@vudel/core';
import { addDefaults } from './addDefaults';

export function useFieldSetDefaults<T extends object>(user: T) {
  const { fields, data } = useFieldSet(user);
  addDefaults(fields);

  return { fields, data };
}