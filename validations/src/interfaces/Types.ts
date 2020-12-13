import { Validators } from './Validators';
import { ValidationFunctionConfigOption } from './ValidationFunctionConfigOption';
import { ValidatorOptions } from './ValidatorOptions';

export type UndefinedRecord<T, V> = { [P in keyof T]?: V; }
export type ValidationType<T> = { [P in keyof Validators<T, keyof T>]?: string | ValidatorOptions<T, P>; }
export type ValidationCollection<T> = { [P in keyof Validators<T, keyof T>]: ValidationFunctionConfigOption<T, P>; };
export type ValidationFunction<V, T, K extends keyof Validators<T, keyof T>> = (val: V, item: T, options?: Validators<T, keyof T>[K]) => boolean;
