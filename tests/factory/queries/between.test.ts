import { beforeAll, beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index";
import { Between } from "@factory/queries/between";

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
 * @see {@link Between#get}
 */
describe("get()", () => {
  let lastIndex: number;
  beforeEach(() => {
    lastIndex = count - 1;
  });

  it("returns all entries by default", () => {
    const result = actions.get().between();
    expect(result).toHaveLength(count);
    expect(result).toEqual(factory["entries"]);
  });
  it("returns all entries when start is 0", () => {
    const result = actions.get().between(0);
    expect(result).toHaveLength(count);
    expect(result).toEqual(factory["entries"]);
  });
  it("returns all entries when start is 0 and end is max", () => {
    const result = actions.get().between(0, lastIndex);
    expect(result).toHaveLength(count);
    expect(result).toEqual(factory["entries"]);
  });
  it("returns the first entry if start 0 and end is 0", () => {
    const result = actions.get().between(0, 0);
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][0]]);
  });
  it("returns the middle entry if start 1 and end is 1", () => {
    const result = actions.get().between(1, 1);
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][1]]);
  });
  it("returns the first two entries if start 0 and end is 1", () => {
    const result = actions.get().between(0, 1);
    expect(result).toHaveLength(2);
    expect(result).toEqual([factory["entries"][0], factory["entries"][1]]);
  });
  it("returns the last entry if start 2 and end is 2", () => {
    const result = actions.get().between(lastIndex, lastIndex);
    expect(result).toHaveLength(1);
    expect(result).toEqual([factory["entries"][lastIndex]]);
  });
  it("returns the last two entries if start 1 and end is 2", () => {
    const result = actions.get().between(1, lastIndex);
    expect(result).toHaveLength(2);
    expect(result).toEqual([factory["entries"][lastIndex - 1], factory["entries"][lastIndex]]);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link Between#set}
 */
describe("set()", () => {
  let before: User[];
  let lastIndex: number;
  beforeEach(() => {
    before = factory["entries"].slice();
    lastIndex = count - 1;
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

  it("updates all entries by default", () => {
    const result = actions.set(source).between();
    expect(result).toHaveLength(count);
    expect(result[0]).not.toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
    expect(result[2]).not.toEqual(before[2]);
  });
  it("updates all entries when start is 0", () => {
    const result = actions.set(source).between(0);
    expect(result).toHaveLength(count);
    expect(result[0]).not.toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
    expect(result[2]).not.toEqual(before[2]);
  });
  it("updates all entries when start is 0 and end is max", () => {
    const result = actions.set(source).between(0, lastIndex);
    expect(result).toHaveLength(count);
    expect(result[0]).not.toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
    expect(result[2]).not.toEqual(before[2]);
  });
  it("updates the first entry if start 0 and end is 0", () => {
    const result = actions.set(source).between(0, 0);
    expect(result).toHaveLength(1);
    expect(result[0]).not.toEqual(before[0]);
    expect(actions["entries"][1]).toEqual(before[1]);
    expect(actions["entries"][2]).toEqual(before[2]);
  });
  it("updates the middle entry if start 1 and end is 1", () => {
    const result = actions.set(source).between(1, 1);
    expect(result).toHaveLength(1);
    expect(actions["entries"][0]).toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
    expect(actions["entries"][2]).toEqual(before[2]);
  });
  it("updates the first two entries if start 0 and end is 1", () => {
    const result = actions.set(source).between(0, 1);
    expect(result).toHaveLength(2);
    expect(result[0]).not.toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
    expect(actions["entries"][2]).toEqual(before[2]);
  });
  it("updates the last entry if start 2 and end is 2", () => {
    const result = actions.set(source).between(lastIndex, lastIndex);
    expect(result).toHaveLength(1);
    expect(actions["entries"][0]).toEqual(before[0]);
    expect(actions["entries"][1]).toEqual(before[1]);
    expect(result[2]).not.toEqual(before[2]);
  });
  it("updates the last two entries if start 1 and end is 2", () => {
    const result = actions.set(source).between(1, lastIndex);
    expect(result).toHaveLength(2);
    expect(actions["entries"][0]).toEqual(before[0]);
    expect(result[1]).not.toEqual(before[1]);
    expect(result[2]).not.toEqual(before[2]);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link Between#delete}
 */
describe("delete()", () => {
  let before: User[];
  let lastIndex: number;
  beforeEach(() => {
    before = factory["entries"].slice();
    lastIndex = count - 1;
  });
  it("deletes all entries by default", () => {
    const result = actions.delete().between();
    expect(result).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(0);
    expect(result).toEqual(before);
  });
  it("deletes all entries when start is 0", () => {
    const result = actions.delete().between(0);
    expect(result).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(0);
    expect(result).toEqual(before);
  });
  it("deletes all entries when start is 0 and end is max", () => {
    const result = actions.delete().between(0, lastIndex);
    expect(result).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(0);
    expect(result).toEqual(before);
  });
  it("deletes the first entry if start 0 and end is 0", () => {
    const result = actions.delete().between(0, 0);
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[0]);
    expect(actions["entries"]).not.toContain(result[0]);
  });
  it("deletes the middle entry if start 1 and end is 1", () => {
    const result = actions.delete().between(1, 1);
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[1]);
    expect(actions["entries"]).not.toContain(result[0]);
  });
  it("deletes the first two entries if start 0 and end is 1", () => {
    const result = actions.delete().between(0, 1);
    expect(result).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
    expect(result[0]).toEqual(before[0]);
    expect(result[1]).toEqual(before[1]);
    expect(actions["entries"]).not.toContain(result[0]);
    expect(actions["entries"]).not.toContain(result[1]);
  });
  it("deletes the last entry if start 2 and end is 2", () => {
    const result = actions.delete().between(lastIndex, lastIndex);
    expect(result).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
    expect(result[0]).toEqual(before[lastIndex]);
    expect(actions["entries"]).not.toContain(result[0]);
  });
  it("deletes the last two entries if start 1 and end is 2", () => {
    const result = actions.delete().between(1, lastIndex);
    expect(result).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
    expect(result[0]).toEqual(before[1]);
    expect(result[1]).toEqual(before[2]);
    expect(actions["entries"]).not.toContain(result[0]);
    expect(actions["entries"]).not.toContain(result[1]);
  });
});
