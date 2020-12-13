
import { defineComponent, reactive, provide, h, Slot, defineAsyncComponent } from 'vue';
import { FieldOption } from '@vudel/core';
import { FieldInputs } from '../fieldInputs';
import { FieldTypeOptions, FieldType, FieldTypeWithOptions } from '../interfaces';
import { toBinary } from '../util';
import { fieldClassesKey, fieldKey, fieldPathKey } from '../symbols';

export default defineComponent({
  name: 'field',
  props: {
    fieldItem: { required: true, default: () => ({} as FieldOption<unknown, keyof unknown>) },
    data: { required: true, default: () => ({} as Record<string, unknown>) },
    path: { type: String, default: '' }
  },
  setup(props) {
    const classes: string[] = reactive(['field']);

    const getComponent = (key: FieldType) => {
      return FieldInputs.getField(key);
    }

    const getFieldType = (type: FieldType | FieldTypeWithOptions): FieldType => {
      if (typeof type !== 'object') return type;
      const keys = Object.keys(type) as FieldType[];
      return keys.length > 0 ? keys[0] : 'text';
    }

    const getFieldOptions = (type: FieldType | FieldTypeWithOptions): Object => {
      if (typeof type !== 'object') return {};

      // TODO: Make sure this is correct
      const keys = Object.keys(type) as (keyof FieldTypeOptions)[];
      return keys.length > 0 ? type[keys[0]] : {};
    }

    provide(fieldClassesKey, classes);
    provide(fieldKey, props.fieldItem);
    provide(fieldPathKey, props.path.replace(/\.(\d+)\./g, '.{$1}.'));
    return { getComponent, getFieldType, getFieldOptions, classes };
  },
  render() {
    const FieldList = defineAsyncComponent(async () => (await import('./FieldList')).default);
    const numRegex = /^\d+$/; 
    const getSlot = (prefix: string) => {
      const path = this.path.split('.') as string[];
      const nums = path.filter(x => numRegex.test(x)).length;

      const paths: string[] = [];
      for (let i = Math.pow(2, nums) - 1; i >= 0; --i) {
        const mask = toBinary(i, nums);
        const result = [];

        let pos = 0;
        for (let j = 0; j < path.length; ++j) {
          if (numRegex.test(path[j])) {
            if (mask[pos] === '1') {
              result.push(path[j]);
            }
            pos++;
          } else {
            result.push(path[j]);
          }
        }
        paths.push(result.join('-'));
      }
      const final = paths.find(x => this.$slots[`${prefix}-${x}`]);
      return this.$slots[`${prefix}-${final}`];
    }

    const children = [];
    if (this.fieldItem.type === 'fieldList') {
      const keys = Object.keys(this.$slots)
        .filter(x => x === 'default' || x.startsWith(`label-${this.fieldItem.name}`) || x.startsWith(`input-${this.fieldItem.name}`));

      const slots: Record<string, Slot> = {};
      for (let i = 0; i < keys.length; ++i) {
        const slot = this.$slots[keys[i]];
        if (slot !== undefined) {
          slots[keys[i]] = slot;
        }
      }
      const data = this.data[this.fieldItem.name];
      if (Array.isArray(data)) {
        children.push(h(FieldList, { data, field: this.fieldItem, path: this.path }, slots));
      } else {
        console.warn('It is not an array');
        // Do something if the data given is not an array
      }
    } else {
      const label = getSlot('label');
      if (label !== undefined) {
        children.push(label({ field: this.fieldItem }));
      } else if (this.fieldItem.label) {
        children.push(h('label', { class: 'field-label'}, [this.fieldItem.label]));
      }

      const input = getSlot('input');
      if (input !== undefined) {
        children.push(input({ field: this.fieldItem }));
      } else {
        const comp = this.getComponent(this.getFieldType(this.fieldItem.type));
        if (comp !== null) {
          children.push(h(
            comp, {
              class: 'field-input',
              modelValue: this.data[this.fieldItem.name],
              'onUpdate:modelValue': (value: unknown) => this.data[this.fieldItem.name] = value,
              placeholder: this.fieldItem.placeholder,
              ...this.getFieldOptions(this.fieldItem.type)
            }
          ));
        }
      }

      if (this.$slots.default) {
        children.push(this.$slots.default());
      }
    }
    return h('div', { class: this.classes }, children);
  }
});