import { useFieldSet } from '../src';

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
  sec: Fifth;
}

interface Fifth {
  name: string;
  arr?: Sixth[];
}

interface Sixth {
  name: string;
}

const set = useFieldSet<First>({ sec: { name: 'hello', arr: [{ name: 'nested 1', obj: { sec: { name: 'deep' } } }, { name: 'nested 2', obj: { sec: { name: 'deep arr', arr: [{ name: 'deep nested 1' } ]}} }]}});

set.fields.push({
  name: 'sec',
  children: [
    { name: 'name' },
    {
      name: 'arr',
      children: [
        { name: 'name' },
        {
          name: 'obj',
          children: [
            {
              name: 'sec',
              children: [
                { name: 'name' },
                {
                  name: 'arr',
                  children: [
                    { name: 'name' }
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