export interface FieldSetState {
  isDirty: boolean;
  submitted: boolean;
  onSubmit: (() => (Promise<boolean> | boolean))[];
}