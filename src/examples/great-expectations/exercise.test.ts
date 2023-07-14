import { describe, expect, it } from 'vitest';
import { createPerson, Person } from '$lib/person';
import { KanbanBoard } from '$lib/kanban-board';

/**
 * toBe: https://vitest.dev/api/expect.html#tobe
 * toBeCloseTo: https://vitest.dev/api/expect.html#tobecloseto
 * toBeInstanceOf: https://vitest.dev/api/expect.html#tobeinstanceof
 * toBeUndefined: https://vitest.dev/api/expect.html#tobeundefined
 * toContain: https://vitest.dev/api/expect.html#tocontain
 * toThrow: https://vitest.dev/api/expect.html#tothrow
 * toThrowError: https://vitest.dev/api/expect.html#tothrowerror
 */

test(
  'should pass if the two numbers would add up correctly in a language other than JavaScript',
  () => {
    expect(0.2 + 0.1).toBeCloseTo(0.3);
  },
);

describe('createPerson', () => {
  it('should create an instance of a person', () => {
    const person = createPerson('Ada Lovelace');
    //expect.hasAssertions();
    expect(person).toBeInstanceOf(Person)
  });
});

describe('Kanban Board', () => {
  
  it("should be include", () => {
    const s = {name: 'sammy', age: 23}
    expect(s).toContain({name: 'sammy'})
  })
  
  it('should include "Backlog" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    expect(board.statuses).toContain('Backlog');
    // Verify that board.statuses contains "Backlog".
  });

  it('should *not* include "Bogus" in board.statuses', () => {
    const board = new KanbanBoard('Things to Do');
    expect(board.statuses).not.toContain('Bogus')
    // Verify that board.statuses does not contain "Bogus".
  });

  it(
    'should include an added status in board.statuses using #addStatus',
    () => {
      const board = new KanbanBoard('Things to Do');
      expect(board.statuses).not.toContain('new status');
      // Use board.addStatus to add a status.
      board.addStatus('new status')
      // Verify that the new status is—in fact—now in board.statuses.
      expect(board.statuses).toContain('new status')
    },
  );

  it('should remove a status using #removeStatus', async () => {
    const board = new KanbanBoard('Things to Do');
    // Use board.removeStatus to remove a status.
    const status = 'new status'
    board.addStatus(status)
    board.removeStatus(status)
    // You can be clever or you can just assume "Backlog" is in board.statuses
    // by }default.
    expect(board.statuses).not.toContain(status)
    // Verify that the status is no longer in in board.statuses.
  });
});

describe("Asymmertic matching", () => {
  it('should validate for ID', () => {
    const obj = {id: 'id23098234', user: {name: 'sammy', age: 23}, location: 'addis'}
    expect(obj).toEqual(
      expect.objectContaining({id: expect.stringContaining("id")})
    )
  })
})

describe('Person', () => {
  it('will create a person with a first name', () => {
    const person = new Person('Madonna');
    expect(person.firstName).toBe('Madonna')
    expect(person.lastName).toBeUndefined()
    expect(person.middleName).toBeUndefined()
    // Verify that person.firstName is correct.
  });

  it('will create a person with a first and last name', () => {
    const person = new Person('Madonna Cicone');
    expect(person.firstName).toBe('Madonna')
    expect(person.lastName).toBe('Cicone')
    expect(person.middleName).toBeUndefined()
    // Verify that person.lastName is correct.
  });

  it('will create a person with a first, middle, and last name', () => {
    const person = new Person('Madonna Louise Cicone');
    expect(person.firstName).toBe('Madonna')
    expect(person.lastName).toBe('Cicone')
    expect(person.middleName).toBe('Louise')
    // Verify that person.middleName is correct.
  });

  it('will throw if you provide an empty string', () => {
    const fn = () => {
      new Person('');
    };

    expect(() => fn()).toThrow('string')

    // Verify that function above throws.
  });

  it(
    'will throw a specific error message if you provide an empty string',
    () => {
      const errorMessage = 'fullName cannot be an empty string';

      const fn = () => {
        new Person('');
      };

      expect(() => fn()).toThrowError(errorMessage);

      // Verify that function above throws the error message above.
    },
  );

  it('will add a friend and pass test happily', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    expect(john).toContain({firstName: 'John'})

    // Verify that john.friends contains paul.
  });

  it('will mutually add a friend, master push is disabled but there is test errror', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);

    expect(john.friends).toContain(paul);
    expect(paul.friends).toContain(john);

    // Verify that paul.friends contains john.
  });

  it('will remove a friend', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    expect(john.friends).not.toContain(paul);

    // Verify that john.friends does not inclide paul.
  });

  it('will mutually remove friends', () => {
    const john = new Person('John Lennon');
    const paul = new Person('Paul McCartney');

    john.addFriend(paul);
    john.removeFriend(paul);

    expect(john).not.contain(paul);
    expect(paul).not.contain(john);

    // Verify that paul.friends does not include john.
  });
});

const explode = () => {
  throw new Error('Something went terribly wrong');
};

describe('explode or throw error', () => {
  it('should throw an error', () => {
    expect(() => explode()).toThrow();
  });

  it('should throw a specific error containing "terribly wrong"', () => {
    expect(() => explode()).toThrow('terribly wrong');
  });
});
