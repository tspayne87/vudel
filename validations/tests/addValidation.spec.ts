import { useFieldSet } from '@vudel/core';
import { addValidation } from '../src';
import { wait } from './util';
import { expect } from 'chai';
import { nextTick } from 'vue';

describe('addValidation tests', () => {
  const required = ['Field is required'];
  const email = ['Please use an email'];
  const contains = ['Must contain at least one (user, admin)'];
  const requiredEmail = ['Field is required', 'Please use an email'];
  const minLength = ['Must contain at least 4'];

  function checkArray(left: string[], right: string[]) {
    for (let i = 0; i < left.length; ++i) {
      expect(left[i]).to.eq(right[i]);
    }
  }

  it('basic usage', async () => {
    const set = useFieldSet({ username: '', email: '', type: '' });
    const validation = addValidation(set);

    set.fields.push({ name: 'username', validations: { require: { } } });
    set.fields.push({ name: 'email', validations: { require: { }, email: { } } });
    set.fields.push({ name: 'type', validations: { contains: { options: ['user', 'admin'] } } });

    await wait();
    checkArray(validation.validations.type || [], contains);
    checkArray(validation.validations.username || [], required);
    checkArray(validation.validations.email || [], requiredEmail);

    set.data.username = 'test-user';
    await wait();
    checkArray(validation.validations.type || [], contains);
    checkArray(validation.validations.username || [], []);
    checkArray(validation.validations.email || [], requiredEmail);

    set.data.email = 'test';
    set.data.type = 'user';
    await wait();
    checkArray(validation.validations.type || [], []);
    checkArray(validation.validations.username || [], []);
    checkArray(validation.validations.email || [], email);

    set.data.email = 'test@email.com';
    set.data.type = '';
    await wait();
    checkArray(validation.validations.type || [], contains);
    checkArray(validation.validations.username || [], []);
    checkArray(validation.validations.email || [], []);
  });

  it('Children Test', async () => {
    interface IAddress {
      line1: string;
      line2: string;
      city: string;
      state: string;
      zip: string;
    }
    
    interface IRole {
      id: number;
      name: string;
    }
    
    interface IUser {
      email: string;
      password: string;
    
      role?: IRole;
      addresses: IAddress[];
    }

    const set = useFieldSet<IUser>({  email: '', password: '', role: { id: 1, name: '' }, addresses: [ { line1: 'Something', line2: '', city: '', state: '', zip: '' } ] });
    const { validations } = addValidation(set);

    set.fields.push({ name: 'email', validations: { require: { } } });
    set.fields.push({ name: 'password', validations: { require: { } } });
    set.fields.push({
      name: 'addresses',
      children: [
        { name: 'line1', validations: { require: { } } },
        { name: 'line2' },
        { name: 'city', validations: { require: { } } },
        { name: 'state', validations: { require: { } } },
        { name: 'zip', validations: { require: { } } }
      ]
    });
    set.fields.push({
      name: 'role',
      children: [
        { name: 'name', validations: { require: { }, minLength: { options: 4 } } }
      ]
    });

    await wait();
    checkArray(validations.email, required);
    checkArray(validations.password, required);
    checkArray(validations['addresses.{0}.line1'], []);
    checkArray(validations['addresses.{0}.city'], required);
    checkArray(validations['addresses.{0}.state'], required);
    checkArray(validations['addresses.{0}.zip'], required);
    checkArray(validations['role.name'], [...required, ...minLength]);

    set.data.addresses[0].city = 'Test City';
    set.data.addresses[0].state = 'HG';
    set.data.addresses[0].zip = '12345';
    if (set.data.role !== undefined) {
      set.data.role.name = 'Hello World';
    }
    await wait();
    checkArray(validations.email, required);
    checkArray(validations.password, required);
    checkArray(validations['addresses.{0}.line1'], []);
    checkArray(validations['addresses.{0}.city'], []);
    checkArray(validations['addresses.{0}.state'], []);
    checkArray(validations['addresses.{0}.zip'], []);
    checkArray(validations['role.name'], []);

    set.data.addresses.push({ line1: 'Road 123', line2: '', city: 'City', state: 'State', zip: '12345' });
    set.data.email = 'email@email.com';
    set.data.password = 'Secret Password';
    await wait();
    checkArray(validations.email, []);
    checkArray(validations.password, []);
    checkArray(validations['addresses.{0}.line1'], []);
    checkArray(validations['addresses.{0}.city'], []);
    checkArray(validations['addresses.{0}.state'], []);
    checkArray(validations['addresses.{0}.zip'], []);
    checkArray(validations['addresses.{1}.line1'], []);
    checkArray(validations['addresses.{1}.city'], []);
    checkArray(validations['addresses.{1}.state'], []);
    checkArray(validations['addresses.{1}.zip'], []);
    checkArray(validations['role.name'], []);

    set.data.addresses.push({ line1: 'Road 123', line2: '', city: 'City', state: 'State', zip: '12345' });
    set.data.email = 'email@email.com';
    set.data.password = 'Secret Password';
    await wait();
    checkArray(validations.email, []);
    checkArray(validations.password, []);
    checkArray(validations['addresses.{0}.line1'], []);
    checkArray(validations['addresses.{0}.city'], []);
    checkArray(validations['addresses.{0}.state'], []);
    checkArray(validations['addresses.{0}.zip'], []);
    checkArray(validations['addresses.{1}.line1'], []);
    checkArray(validations['addresses.{1}.city'], []);
    checkArray(validations['addresses.{1}.state'], []);
    checkArray(validations['addresses.{1}.zip'], []);
    checkArray(validations['addresses.{2}.line1'], []);
    checkArray(validations['addresses.{2}.city'], []);
    checkArray(validations['addresses.{2}.state'], []);
    checkArray(validations['addresses.{2}.zip'], []);
    checkArray(validations['role.name'], []);

    set.data.addresses[2].line1 = '';
    await wait();
    checkArray(validations.email, []);
    checkArray(validations.password, []);
    checkArray(validations['addresses.{0}.line1'], []);
    checkArray(validations['addresses.{0}.city'], []);
    checkArray(validations['addresses.{0}.state'], []);
    checkArray(validations['addresses.{0}.zip'], []);
    checkArray(validations['addresses.{1}.line1'], []);
    checkArray(validations['addresses.{1}.city'], []);
    checkArray(validations['addresses.{1}.state'], []);
    checkArray(validations['addresses.{1}.zip'], []);
    checkArray(validations['addresses.{2}.line1'], required);
    checkArray(validations['addresses.{2}.city'], []);
    checkArray(validations['addresses.{2}.state'], []);
    checkArray(validations['addresses.{2}.zip'], []);
    checkArray(validations['role.name'], []);
  });

  it('Deep Nested', async () => {
    interface First {
      sec: Second;
    }

    interface Second {
      name: string;
      arr?: Third[];
    }

    interface Third {
      name: string;
      obj?: Forth;
    }

    interface Forth {
      sec: Fifth | Sixth;
    }

    interface Fifth {
      name: string;
      arr?: Sixth[];
    }

    interface Sixth {
      name: string;
    }

    const obj: First = {
      sec: {
        name: 'hello',
        arr: [
          {
            name: 'nested 12345678901234567890',
            obj: {
              sec: {
                name: 'deep'
              }
            }
          },
          {
            name: 'nested 2',
            obj: {
              sec: {
                name: 'deep arr 1234567890123456789012345678901234567890',
                arr: [
                  { name: 'deep nested 1' }
                ]
              }
            }
          }
        ]
      }
    };
    const set = useFieldSet<First>(obj);
    const { validations } = addValidation(set);

    set.fields.push({
      name: 'sec',
      children: [
        { name: 'name', validations: { require: { } } },
        {
          name: 'arr',
          children: [
            { name: 'name', validations: { require: { }, minLength: { options: 20 } } },
            {
              name: 'obj',
              children: [
                {
                  name: 'sec',
                  children: [
                    { name: 'name', validations: { require: { }, minLength: { options: 40 } } },
                    {
                      name: 'arr',
                      children: [
                        { name: 'name', validations: { require: { }, minLength: { options: 100 } } }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    await wait();
    checkArray(validations['sec.name'], []);
    checkArray(validations['sec.arr.{0}.name'], []);
    checkArray(validations['sec.arr.{1}.name'], ['Must contain at least 20']);
    checkArray(validations['sec.arr.{0}.obj.sec.name'], ['Must contain at least 40']);
    checkArray(validations['sec.arr.{1}.obj.sec.name'], []);

    // Need to ask justin if this seems correct or if this should be ignored since the object does not exist to check
    // Need to not allow this 'JUSTIN HAS SPOKEN'
    checkArray(validations['sec.arr.{0}.obj.sec.arr.name'], [...required, 'Must contain at least 100']);
    checkArray(validations['sec.arr.{1}.obj.sec.arr.{0}.name'], ['Must contain at least 100']);
  });
});