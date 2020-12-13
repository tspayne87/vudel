# @vudel
Vudel is a set of packages meant to help with model.  Using the @vudel/validations you can add validations to your model
and using @vudel/ui you can pass a set of fields into a UI component to create a form on the page.

## Usage
The following is a simple usage of creating a field set and adding some fields

```typescript
  import { useFieldSet } from '@vudel/core';
  import { addValidation } from '@vudel/validations';

  // Create the field set
  const { fields, data } = useFieldSet({ foo: 'bar', bar: 'foo' });
  const { validations } = addValidation({ fields, data });

  // Add some fields for this field set
  fields.push({ name: 'foo', validations: { require: { }, email: { message: 'Needs to be an email' } } });
  fields.push({ name: 'bar', validations: { require: { }, contains: { options: ['foo', 'bar'] } } });

  // The original data is stored in the data property, will also update the
  // validations with a validation error since foo-bar does not exist in the contains validation.
  data.foo = 'foo-bar';
```

### License
@vudel is licensed under the [MIT license](https://opensource.org/licenses/MIT).