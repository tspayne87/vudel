<template>
  <textarea :rows="rows" v-model="innerValue" />
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';

  export default defineComponent({
    name: 'text-input',
    props: {
      rows: Number,
      modelValue: String
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
