<template>
  <div class="wrapper">
    <field-set :fields="fields" :data="data" @submit="onSubmit($event)">
      <template v-slot:buttons="{ submit }">
        <button @click="submit()">Submit Form</button>
      </template>
      
      <validation :validations="validations" visible />
    </field-set>
    <pre style="text-align: left;">{{showPretty(data)}}</pre>
    <pre style="text-align: left;">{{showPretty(validations)}}</pre>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useUser } from './compositions/useUser';
  import { FieldSet, Validation } from '../src';
  import { IUser } from './interfaces';

  export default defineComponent({
    name: 'test-app',
    components: { FieldSet, Validation },
    setup(props) {
      const { fields, data, validations } = useUser({ email: 'test@email.com', password: '', addresses: [] });

      const showPretty = (obj: unknown) => {
        return JSON.stringify(obj, null, 2);
      }

      const onSubmit = (result: IUser) => {
        console.log(result);
      }
      return { fields, data, validations, showPretty, onSubmit };
    }
  });
</script>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 1rem;
    gap: 1rem;
  }
</style>