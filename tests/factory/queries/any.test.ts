import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index.js";
import { Any } from "@factory/queries/any.js";

import { base } from "@tests/helpers.vitest.js";
import { User } from "@tests/types.vitest.js";

/**
 * beforeEach
 *
 * @remarks
 * Apply beforeEach test in this suite. We make(100) entries for any() to improve the randomness of the tests.
 */
let count: number;
let factory: Factory<User>;
let actions: Actions<User>;
let source: Closure<Adaptable<User>>;
beforeEach(() => {
  count = 100;
  factory = new Factory<User>(base);
  actions = factory.make(count);
});

/**
 * get()
 *
 * @function
 * @see {@link Any#get}
 */
describe("get()", () => {
  it("returns only one random entry by default", () => {
    let different = false;
    const first = actions.get().any();
    for (let i = 0; i < 10; i++) {
      const next = actions.get().any();
      if (first !== next) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });
  it("returns only one random entry when count is 1", () => {
    let different = false;
    const first = actions.get().any(1);
    for (let i = 0; i < 10; i++) {
      const next = actions.get().any();
      if (first !== next) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });
  it("returns five random entries for a count of 5", () => {
    let different = false;
    const first = actions.get().any(5);
    for (let i = 0; i < 20; i++) {
      const next = actions.get().any(5);
      const isDifferent = first.some((entry, idx) => entry !== next[idx]);
      if (isDifferent) {
        different = true;
        break;
      }
    }
    expect(different).toBe(true);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link Any#set}
 */
describe("set()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
    source = faker => ({
      id: faker.string.uuid(),
    });
  });

  it("updates only one random entry by default", () => {
    const result = actions.set(source).any();
    const changed = before.filter(entry => {
      return result.some(compare => {
        return entry.password === compare.password && entry.id !== compare.id;
      });
    }).length;
    expect(changed).toBe(1);
  });
  it("updates only one random entry when count is 1", () => {
    const result = actions.set(source).any(1);
    const changed = before.filter(entry => {
      return result.some(compare => {
        return entry.password === compare.password && entry.id !== compare.id;
      });
    }).length;
    expect(changed).toBe(1);
  });
  it("updates five random entries for a count of 5", () => {
    const result = actions.set(source).any(5);
    const changed = before.filter(entry => {
      return result.some(compare => {
        return entry.password === compare.password && entry.id !== compare.id;
      });
    }).length;
    expect(changed).toBe(5);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link Any#delete}
 */
describe("delete()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });
  it("deletes only one random entry by default", () => {
    const result = actions.delete().any();
    const after = factory["entries"];
    expect(after.length).toBe(before.length - 1);
    expect(before).toContain(result[0]);
  });
  it("deletes only one random entry when count is 1", () => {
    const result = actions.delete().any(1);
    const after = factory["entries"];
    expect(after.length).toBe(before.length - 1);
    expect(before).toContain(result[0]);
  });
  it("deletes five random entries for a count of 5", () => {
    const result = actions.delete().any(5);
    const after = factory["entries"];
    expect(after.length).toBe(before.length - 5);
    result.forEach(entry => {
      expect(before).toContain(entry);
    });
  });
});
