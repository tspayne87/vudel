# @vudel/ui
Vudel UI is a set of components that will help with building out a form in the browser

## Installation
### NPM
```bash
  npm install --save @vudel/ui
```

### Yarn
```bash
  yarn add @vudel/ui
```

## Usage
The following is a simple usage of creating a UI with some validations and fields

### compositions/useUser
```typescript
  import { useFieldSet } from '@vudel/core';
  import { addValidation, ValidationType } from '@vudel/validations';
  import { IAddress, IUser } from '../interfaces';

  export function useUser(user: IUser) {
    const { fields, data } = useFieldSet(user);
    const { validations } = addValidation({ fields, data });

    const addressline1_2vali: ValidationType<IAddress> = { minLength: { options: 10 }, regex: { options: /\d{4}/ } };

    fields.push({ name: 'email', type: 'email', label: 'Email', validations: { require: { }, email: { } } });
    fields.push({ name: 'password', type: 'password', label: 'Password', placeholder: 'Enter Password', validations: { require: { } } });
    fields.push({
      name: 'addresses',
      type: 'fieldList',
      label: 'Addresses',
      children: [
        { name: 'line1', type: 'text', label: 'Address Line 1', validations: { require: { }, ...addressline1_2vali } },
        { name: 'line2', type: 'text', label: 'Address Line 2', validations: addressline1_2vali },
        { name: 'city', type: 'text', label: 'City', validations: { require: { } } },
        { name: 'state', type: 'text', label: 'State', validations: { require: { } } },
        { name: 'zip', type: 'text', label: 'Zip', validations: { require: { } } }
      ]
    });

    return { fields, validations, data };
  }
```

### 
```typescript
  import { defineComponent } from 'vue';
  import { useUser } from './compositions/useUser';
  import { FieldSet, Validation } from '@vudel/ui';
  import { IUser } from './interfaces';

  export default defineComponent({
    name: 'test-app',
    components: { FieldSet, Validation },
    setup(props) {
      const { fields, data, validations } = useUser({ email: 'test@email.com', password: '', addresses: [] });
      return { fields, data, validations };
    }
  });
```

```html
  <field-set :fields="fields" :data="data">
    <validation :validations="validations" visible />
  </field-set>
```

### License
@vudel is licensed under the [MIT license](https://opensource.org/licenses/MIT).