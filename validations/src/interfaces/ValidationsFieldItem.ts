import { WatchStopHandle } from 'vue';
import { ValidationType } from './Types';
import { Validators } from './Validators';

export interface ValidationFieldItem<T> {
  name: string;
  options: ValidationType<T>;
  handle: WatchStopHandle;
}
