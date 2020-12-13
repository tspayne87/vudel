import { fieldPathKey } from '../symbols';
import { inject } from 'vue';

export function useFieldPath() {
  return inject(fieldPathKey, null) as string | null;
}