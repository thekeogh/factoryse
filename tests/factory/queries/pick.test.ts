import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index.js";
import { Pick } from "@factory/queries/pick.js";

import { base } from "@tests/helpers.vitest.js";
import { User } from "@tests/types.vitest.js";

/**
 * beforeEach
 *
 * @remarks
 * Apply beforeEach test in this suite.
 */
let count: number;
let factory: Factory<User>;
let actions: Actions<User>;
let source: Closure<Adaptable<User>>;
beforeEach(() => {
  count = 5;
  factory = new Factory<User>(base);
  actions = factory.make(count);
});

/**
 * get()
 *
 * @function
 * @see {@link Pick#get}
 */
describe("get()", () => {
  it("returns a single entry when index is 0 only", () => {
    const result = actions.get().pick([0]);
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][0]]);
  });
  it("returns the two entries at index [1, 3]", () => {
    const result = actions.get().pick([1, 3]);
    expect(result).toHaveLength(2);
    expect(result).toEqual([factory["entries"][1], factory["entries"][3]]);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link Pick#set}
 */
describe("set()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
    source = faker => ({ id: faker.string.uuid() });
  });

  it("updates a single entry when index is 0 only", () => {
    const result = actions.set(source).pick([0]);
    expect(result).toHaveLength(1);
    expect(result[0].id).not.toBe(before[0].id);
    expect(result[0].password).toBe(before[0].password);
    expect(actions["entries"][0].id).not.toBe(before[0].id);
    expect(actions["entries"][0].password).toBe(before[0].password);
  });
  it("updates the two entries at index [1, 3]", () => {
    const result = actions.set(source).pick([1, 3]);
    expect(result).toHaveLength(2);
    expect(result[0].id).not.toBe(before[1].id);
    expect(result[0].password).toBe(before[1].password);
    expect(actions["entries"][1].id).not.toBe(before[1].id);
    expect(actions["entries"][1].password).toBe(before[1].password);
    expect(result[1].id).not.toBe(before[3].id);
    expect(result[1].password).toBe(before[3].password);
    expect(actions["entries"][3].id).not.toBe(before[3].id);
    expect(actions["entries"][3].password).toBe(before[3].password);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link Pick#delete}
 */
describe("delete()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });
  it("deletes a single entry when index is 0 only", () => {
    const result = actions.delete().pick([0]);
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[0]);
  });
  it("deletes the two entries at index [1, 3]", () => {
    const result = actions.delete().pick([1, 3]);
    expect(result).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
    expect(result[0]).toEqual(before[1]);
    expect(result[1]).toEqual(before[3]);
  });
});
