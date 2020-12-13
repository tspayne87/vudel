import { fieldKey } from '../symbols';
import { FieldOption } from '@vudel/core';
import { inject } from 'vue';

export function useField() {
  return inject(fieldKey, null) as FieldOption<unknown, never> | null;
}