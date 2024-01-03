import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index.js";
import { First } from "@factory/queries/first.js";

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
  count = 3;
  factory = new Factory<User>(base);
  actions = factory.make(count);
});

/**
 * get()
 *
 * @function
 * @see {@link First#get}
 */
describe("get()", () => {
  it("returns only the first entry by default", () => {
    const result = actions.get().first();
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][0]]);
  });
  it("returns a single entry when count is 1", () => {
    const result = actions.get().first(1);
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][0]]);
  });
  it("returns the first two entries for a count of 2", () => {
    const result = actions.get().first(2);
    expect(result).toHaveLength(2);
    expect(result).toEqual([factory["entries"][0], factory["entries"][1]]);
  });
  it("returns all entries for a count equal to the total number of entries", () => {
    const result = actions.get().first(count);
    expect(result).toHaveLength(count);
    expect(result).toEqual(factory["entries"]);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link First#set}
 */
describe("set()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
    source = faker => ({
      email: faker.internet.email(),
      profile: {
        bio: faker.lorem.paragraph(4),
        social: {
          facebook: faker.internet.url(),
        },
      },
    });
  });

  it("updates only the first entry by default", () => {
    const result = actions.set(source).first();
    expect(result).toHaveLength(1);
    expect(result[0]).not.toEqual(before[0]);
  });
  it("updates a single entry when count is 1", () => {
    const result = actions.set(source).first(1);
    expect(result).toHaveLength(1);
    expect(result[0]).not.toEqual(before[0]);
  });
  it("updates the first two entries for a count of 2", () => {
    const result = actions.set(source).first(2);
    expect(result).toHaveLength(2);
    expect(result[0]).not.toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
  });
  it("updates all entries for a count equal to the total number of entries", () => {
    const result = actions.set(source).first(count);
    expect(result).toHaveLength(count);
    expect(result[0]).not.toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
    expect(result[2]).not.toEqual(before[2]);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link First#delete}
 */
describe("delete()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });
  it("deletes only the first entry by default", () => {
    const result = actions.delete().first();
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[0]);
  });
  it("deletes a single entry when count is 1", () => {
    const result = actions.delete().first(1);
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[0]);
  });
  it("deletes the first two entries for a count of 2", () => {
    const result = actions.delete().first(2);
    expect(result).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
    expect(result).toEqual([before[0], before[1]]);
  });
  it("deletes all entries for a count equal to the total number of entries", () => {
    const result = actions.delete().first(count);
    expect(actions["entries"]).toEqual([]);
    expect(result).toEqual(before);
  });
});
