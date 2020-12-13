import { defineComponent, computed, h, Slot, defineAsyncComponent } from 'vue';
import { FieldOption } from '@vudel/core';

export default defineComponent({
  name: 'field-list',
  props: {
    field: { required: true, default: () => ({} as FieldOption<unknown, keyof unknown>) },
    data: { type: Array, required: true },
    path: { type: String, default: '' }
  },
  setup(props, { emit }) {
    const addItem = () => {
      props.data.push({});
    }

    const removeItem = (item: unknown) => {
      const index = props.data.indexOf(item);
      if (index !== -1) {
        props.data.splice(index, 1);
      }
    }

    const path = (index: number) => props.path.length > 0 ? `${props.path}.${index}` : index.toString();
    return { addItem, removeItem, path };
  },
  render() {
    const FieldSet = defineAsyncComponent(async () => (await import('./FieldSet')).default);
    const children = [];

    const label = this.$slots[`label-${this.field.name}`];
    if (label !== undefined) {
      children.push(label({ field: this.field }));
    } else if (this.field.label) {
      children.push(h('label', { class: 'field-label' }, [
        this.field.label,
        h('span', {
            class: 'field-list-add-button',
            onClick: () => this.addItem()
          }, ['Add'])
      ]));
    }

    const sets = [];
    if (this.data?.length ?? 0 > 0) {
      const slots: Record<string, Slot> = {};
      const keys = Object.keys(this.$slots).filter(x => x !== `label-${this.field.name}`);
      for(let i = 0; i < keys.length; ++i) {
        const slot = this.$slots[keys[i]];
        if (slot !== undefined) {
          slots[keys[i]] = slot;
        }
      }

      for (let i = 0; i < this.data.length; ++i) {
        const item = this.data[i];
        sets.push(h('div', { class: 'field-list-set-wrapper' }, [
          h(FieldSet, { fields: this.field.children, data: item, path: this.path(i) }, slots),
          h('span', { class: 'field-list-remove-button', onClick: () => this.removeItem(item)}, ['Remove'])
        ]));
      }
    } else {
      sets.push(h('div', { class: 'field-list-empty' }, [`${this.field.label} is empty, please add more.`]));
    }
    children.push(h('div', { class: 'field-list-content'}, sets));
    return h('div', { class: 'field-list' }, children);
  }
});