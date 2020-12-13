<template>
  <ul class="field-validations" v-if="state !== null && state.submitted && visible && validations[fieldName] && validations[fieldName].length > 0">
    <li class="validation-message" v-for="(message, i) in validations[fieldName]" :key="i">
      {{message}}
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, onUnmounted, watch, watchEffect } from 'vue';
  import { useField, useFieldClasses, useFieldPath, useFieldSetState } from '../compositions';
  import { FieldSetState } from '../interfaces';
  import { fieldClassesKey, fieldKey, fieldPathKey, fieldSetStateKey } from '../symbols';

  export default defineComponent({
    name: 'validation',
    props: {
      validations: { required: true, default: {} as Record<string, string[]> },
      visible: { type: Boolean, default: false }
    },
    setup(props) {
      const errorClassName = 'field-error';
      const fieldClasses = useFieldClasses();
      const field = useField();
      const fieldName = useFieldPath();
      const state = useFieldSetState();
      const isValid = () => fieldName !== null ? props.validations[fieldName] && Object.keys(props.validations[fieldName]).length === 0 : true;

      if (state !== null) {
        state.onSubmit.push(isValid);
      }

      watchEffect(() => {
        const validation = fieldName !== null ? props.validations[fieldName] : [];
        const index = fieldClasses.indexOf(errorClassName);
        if (validation && Object.keys(validation).length > 0) {
          if (index === -1)
            fieldClasses.push(errorClassName);
        } else {
          if (index !== -1)
            fieldClasses.splice(index, 1);
        }
      });

      onUnmounted(() => {
        if (state !== null) {
          const index = state.onSubmit.indexOf(isValid);
          if (index !== -1) {
            state.onSubmit.splice(index, 1);
          }
        }
      });

      return { fieldName, state }
    }
  });
</script>
