import { fieldClassesKey } from '../symbols';
import { inject } from 'vue';

export function useFieldClasses() {
  return inject(fieldClassesKey, []) as string[];
}