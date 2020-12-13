import { useFieldSet } from '@vudel/core';

interface IUser {
  email: string;
  password: string;
}

interface IFullUser extends IUser {
  firstName: string;
  lastName: string;
}

export function useUser<T extends IUser>(user: T) {
  const { fields, data} = useFieldSet(user);

  fields.push({ name: 'email', type: 'email', label: 'Email' });
  fields.push({ name: 'password', type: 'password', label: 'password' });
  return { fields, data };
}

export function useFullUser(user: IFullUser) {
  const { fields, data } = useUser(user);

  fields.push({ name: 'firstName', type: 'text', label: 'First Name' });
  fields.push({ name: 'lastName', type: 'text', label: 'Last Name' });
  return { fields, data };
}