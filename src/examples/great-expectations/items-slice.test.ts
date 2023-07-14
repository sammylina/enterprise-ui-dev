import reducer, {
  add,
  remove,
  toggle,
  markAllAsUnpacked,
  update,
} from './items-slice';

it('returns an empty array as the initial state', () => {
  expect(reducer(undefined, { type: 'noop' })).toEqual([]);
});

it('supports adding an item with the correct name', () => {
  const result = reducer([], add({ name: 'iPhone' }));
  expect(result).toContainEqual({
    id: expect.any(String),
    name: 'iPhone',
    packed: false
  })
});

it('prefixes ids with "item-"', () => {
  const result = reducer([], add({ name: 'iPhone' }));
  expect(result).toContainEqual({
    id: expect.stringMatching(/^item-/),
    name: 'iPhone',
    packed: false
  })
});

it('should set false the default value of packed', () => {
  const result = reducer([], add({ name: 'iPhone' }));
  expect(result).toEqual([expect.objectContaining({packed: false, name: 'iPhone'})])
});

it('supports removing an item', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, remove({ id: '1' }));
  expect(result).toEqual([])
});

it('supports toggling an item and keep building on CI pipeline', () => {
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(state, toggle({ id: '1' }));
  expect(result).toEqual([expect.objectContaining({id: '1', name: 'iPhone', packed: true})])
});

it('supports updating an item', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: false,
    },
  ];

  const result = reducer(
    state,
    update({ id: '1', name: 'Samsung Galaxy S23' }),
  );
  expect(result).toEqual([expect.objectContaining({
    id: '1',
    name: 'Samsung Galaxy S23'
  })])
});

it('supports marking all items as unpacked', () => {
  expect.hasAssertions();
  const state = [
    {
      id: '1',
      name: 'iPhone',
      packed: true,
    },
    {
      id: '2',
      name: 'iPhone Charger',
      packed: true,
    },
  ];

  const result = reducer(state, markAllAsUnpacked());
  expect(result).toContainEqual({
    id: expect.any(String),
    name: expect.any(String),
    packed: false
  })
});
