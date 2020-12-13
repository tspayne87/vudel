<template>
  <input type="number" v-model.number="value" />
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'number-input',
    props: {
      precision: Number,
      modelValue: Number
    },
    setup(props, { emit }) {
      const innerValue = computed({
        get: () => props.modelValue,
        set: (value) => emit('update:modelValue', value)
      });
      return { innerValue };
    }
  });
</script>
