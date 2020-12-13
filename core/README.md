# @vudel/core
Vudel Core sets up a framework to define fields on a field set.  Using @vudel/validations

## Installation
### NPM
```bash
  npm install --save @vudel/core
```

### Yarn
```bash
  yarn add @vudel/core
```

## Usage
The following is a simple usage of creating a field set and adding some fields

```typescript
  import { useFieldSet } from '@vudel/core';

  // Create the field set
  const { fields, data } = useFieldSet({ foo: 'bar', bar: 'foo' });

  // Add some fields for this field set
  fields.push({ name: 'foo' });
  fields.push({ name: 'bar' });

  // The original data is stored in the data property 
  data.foo = 'foo-bar';
```

### License
@vudel/core is licensed under the [MIT license](https://opensource.org/licenses/MIT).