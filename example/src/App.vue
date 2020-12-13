<template>
  <field-set :fields="fields" :data="data" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { FieldSet } from '@vudel/ui';
  import { useFullUser } from './compositions/useUser';

  export default defineComponent({
    name: 'app',
    components: { FieldSet },
    setup(props) {
      const { fields, data } = useFullUser({ email: '', password: '', firstName: '', lastName: '' });
      return { fields, data };
    }
  });
</script>
