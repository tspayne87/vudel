import { FieldSetState } from '../interfaces';
import { fieldSetStateKey } from '../symbols';
import { inject } from 'vue';

export function useFieldSetState() {
  return inject(fieldSetStateKey, null) as FieldSetState | null;
}