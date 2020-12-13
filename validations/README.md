# @vudel/validations
Vudel additions to add validation to the field set

## Installation
### NPM
```bash
  npm install --save @vudel/validations
```

### Yarn
```bash
  yarn add @vudel/validations
```

## Usage
The following is a simple usage of creating a field set and adding in some validations

```typescript
  import { useFieldSet } from '@vudel/core';
  import { addValidation } from '@vudel/validations';

  // Create the field set
  const set = useFieldSet({ foo: 'bar', bar: 'foo' });
  const validation = addValidation(set);

  // Add some fields for this field set
  set.fields.push({ name: 'foo', validations: ['required'] });
  set.fields.push({ name: 'bar', validations: ['required'] });

  // The original data is stored in the data property 
  set.data.foo = 'foo-bar';

  setTimeout(() => {
    console.log(validation.validations.foo); // [] or empty array
    console.log(validation.validations.bar); // ['Field is required']
  });
```

### License
@vudel/core is licensed under the [MIT license](https://opensource.org/licenses/MIT).