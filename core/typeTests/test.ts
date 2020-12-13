import { useFieldSet } from '../src';
import { IUser } from './IUser';

const { fields, data } = useFieldSet<IUser>({ email: '', password: '', addresses: [] });


fields.push({
  name: 'addresses',
  description: 'This is a role',
  children: [
    {
      name: 'line1',
      description: 'Hello All'
    },
    {
      name: 'line2'
    }
  ]
})