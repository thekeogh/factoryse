import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index";
import { Last } from "@factory/queries/last";

import { base } from "@tests/helpers.vitest";
import { User } from "@tests/types.vitest";

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
 * @see {@link Last#get}
 */
describe("get()", () => {
  it("returns only the last entry by default", () => {
    const result = actions.get().last();
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][count - 1]]);
  });
  it("returns a single entry when count is 1", () => {
    const result = actions.get().last(1);
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][count - 1]]);
  });
  it("returns the last two entries for a count of 2", () => {
    const result = actions.get().last(2);
    expect(result).toHaveLength(2);
    expect(result).toEqual([factory["entries"][1], factory["entries"][2]]);
  });
  it("returns all entries for a count equal to the total number of entries", () => {
    const result = actions.get().last(count);
    expect(result).toHaveLength(count);
    expect(result).toEqual(factory["entries"]);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link Last#set}
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

  it("updates only the last entry by default", () => {
    const result = actions.set(source).last();
    expect(result).toHaveLength(1);
    expect(result[0]).not.toEqual(before[count - 1]);
  });
  it("updates a single entry when count is 1", () => {
    const result = actions.set(source).last(1);
    expect(result).toHaveLength(1);
    expect(result[0]).not.toEqual(before[count - 1]);
  });
  it("updates the last two entries for a count of 2", () => {
    const result = actions.set(source).last(2);
    expect(result).toHaveLength(2);
    expect(result[1]).not.toEqual(before[count - 2]);
    expect(result[0]).not.toEqual(before[count - 1]);
  });
  it("updates all entries for a count equal to the total number of entries", () => {
    const result = actions.set(source).last(count);
    expect(result).toHaveLength(count);
    expect(result[2]).not.toEqual(before[2]);
    expect(result[1]).not.toEqual(before[1]);
    expect(result[0]).not.toEqual(before[0]);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link Last#delete}
 */
describe("delete()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });
  it("deletes only the last entry by default", () => {
    const result = actions.delete().last();
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[count - 1]);
  });
  it("deletes a single entry when count is 1", () => {
    const result = actions.delete().last(1);
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[count - 1]);
  });
  it("deletes the last two entries for a count of 2", () => {
    const result = actions.delete().last(2);
    expect(result).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
    expect(result).toEqual([before[count - 2], before[count - 1]]);
  });
  it("deletes all entries for a count equal to the total number of entries", () => {
    const result = actions.delete().last(count);
    expect(actions["entries"]).toEqual([]);
    expect(result).toEqual(before);
  });
});
