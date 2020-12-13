import { useFieldSet } from '@vudel/core';
import { addValidation, ValidationType } from '@vudel/validations';
import { IAddress, IUser } from '../interfaces';

export function useUser(user: IUser) {
  const { fields, data } = useFieldSet(user);
  const { validations } = addValidation({ fields, data });
  // addDefaults(fields);

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