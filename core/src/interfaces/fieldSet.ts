/**
 * Helper type that is meant to get the underlining type based on the array given
 */
export type Unarray<T> = T extends Array<infer U> ? U : T;

/**
 * The field option object that should be extended if new options need to be available
 */
export interface FieldOption<T, K extends keyof T> {
  name: K;
  description?: string;
  children?: FieldOptions<Unarray<T[K]>>[];
}

/**
 * The set of field options so that we can recursively go through the object itself to get type sensitive results
 */
export type FieldOptions<T> = { [K in keyof T]-?: FieldOption<T, K> }[keyof T];

/**
 * The returned data model for the useFieldSet composition
 */
export interface FieldSet<T> {
  data: T;
  fields: FieldOptions<T>[];
}
