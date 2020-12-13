import { defineComponent, h, reactive, provide, Slot, VNode, defineAsyncComponent } from 'vue';
import { FieldOptions } from '@vudel/core';
import { useFieldSetState } from '../compositions';
import { fieldSetStateKey } from '../symbols';

export default defineComponent({
  name: 'field-set',
  props: {
    fields: { required: true, default: () => ([] as FieldOptions<Record<string, unknown>>[]) },
    data: { required: true, default: () => ({} as unknown) },
    path: { type: String, default: '' }
  },
  setup(props, { emit }) {
    let state = useFieldSetState();
    if (state === null) {
      state = reactive({ isDirty: false, submitted: false, onSubmit: [] });
      provide(fieldSetStateKey, state);
    }

    const submit = async () => {
      if (state !== null) {
        let canSubmit = true;
        for (let i = 0; i < state.onSubmit.length && canSubmit; ++i) {
          canSubmit = canSubmit && await Promise.resolve(state.onSubmit[i]());
        }

        state.isDirty = false;
        state.submitted = true;
        if (canSubmit) {
          emit('submit', props.data);
        }
      }
    }
    return { submit };
  },
  render() {
    const Field = defineAsyncComponent(async () => (await import('./Field')).default);
    const children = this.fields
      .map(item => {
        const props = { fieldItem: item, data: this.data, path: this.path.length > 0 ? `${this.path}.${item.name}` : item.name };
        const slots: Record<string, Slot> = {};

        const pathStr = this.path.replace(/\.(\d+)/, '(-$1)*-');
        const labelRegex = new RegExp(`^label-${pathStr}${item.name}`);
        const inputRegex = new RegExp(`^input-${pathStr}${item.name}`)
        
        if (this.$slots !== undefined) {
          const keys = Object.keys(this.$slots)
            .filter(x => x === 'default' || labelRegex.test(x) || inputRegex.test(x));
          for (let i = 0; i < keys.length; ++i) {
            const slot = this.$slots[keys[i]];
            if (slot !== undefined) {
              slots[keys[i]] = slot;
            }
          }
        }
        return h(Field as any, props, slots);
      }) as (VNode | VNode[])[];

    if (this.$slots.buttons) {
      children.push(this.$slots.buttons({ submit: this.submit }));
    }

    return h('div', { class: 'field-set' }, children);
  }
});