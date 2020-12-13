import { useFieldSet } from '../src';

interface IUser {
  email: string;
  password: string;
}

interface IFullUser extends IUser {
  firstName: string;
  lastName: string;
}

function useUser<T extends IUser>(user: T) {
  const { fields } = useFieldSet(user);

  fields.push({ name: 'email' });
  fields.push({ name: 'password' });
  return { fields };
}

function useFullUser(user: IFullUser) {
  const { fields } = useUser(user);

  fields.push({ name: 'firstName' });
  fields.push({ name: 'lastName' });
  return { fields };
}