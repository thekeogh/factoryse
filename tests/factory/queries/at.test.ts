import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index";
import { At } from "@factory/queries/at";

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
 * @see {@link At#get}
 */
describe("get()", () => {
  it("returns the first entry when no index is provided", () => {
    const result = actions.get().at();
    expect(result).toEqual(factory["entries"][0]);
  });
  it("returns the first entry for index 0", () => {
    const result = actions.get().at(0);
    expect(result).toEqual(factory["entries"][0]);
  });
  it("returns the second entry for index 1", () => {
    const result = actions.get().at(1);
    expect(result).toEqual(factory["entries"][1]);
  });
  it("returns the last entry for the highest index", () => {
    const result = actions.get().at(count - 1);
    expect(result).toEqual(factory["entries"][count - 1]);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link At#set}
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

  it("updates the first entry when no index is provided", () => {
    const result = actions.set(source).at();
    expect(result.id).toBe(before[0].id);
    expect(result.email).not.toBe(before[0].email);
    expect(before[1]).toEqual(actions["entries"][1]);
  });
  it("updates a single entry when index is 0", () => {
    const result = actions.set(source).at(0);
    expect(result.id).toBe(before[0].id);
    expect(result.email).not.toBe(before[0].email);
    expect(before[1]).toEqual(actions["entries"][1]);
  });
  it("updates the second entry for index 1", () => {
    const result = actions.set(source).at(1);
    expect(result.id).toBe(before[1].id);
    expect(result.email).not.toBe(before[1].email);
    expect(before[0]).toEqual(actions["entries"][0]);
  });
  it("updates the last entry for the highest index", () => {
    const result = actions.set(source).at(count - 1);
    expect(result.id).toBe(before[count - 1].id);
    expect(result.email).not.toBe(before[count - 1].email);
    expect(before[0]).toEqual(actions["entries"][0]);
    expect(before[1]).toEqual(actions["entries"][1]);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link At#delete}
 */
describe("delete()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });
  it("deletes the first entry when no index is provided", () => {
    const result = actions.delete().at();
    expect(factory["entries"]).toHaveLength(count - 1);
    expect(result).toEqual(before[0]);
  });
  it("deletes the first entry for index 0", () => {
    const result = actions.delete().at(0);
    expect(factory["entries"]).toHaveLength(count - 1);
    expect(result).toEqual(before[0]);
  });
  it("deletes the second entry for index 1", () => {
    const result = actions.delete().at(1);
    expect(factory["entries"]).toHaveLength(count - 1);
    expect(result).toEqual(before[1]);
  });
  it("deletes the last entry for the highest index", () => {
    const result = actions.delete().at(count - 1);
    expect(factory["entries"]).toHaveLength(count - 1);
    expect(result).toEqual(before[count - 1]);
  });
  it("deletes the only entry if one exists and empties the entries array", () => {
    actions = new Factory<User>(base).make(1);
    before = actions["entries"].slice();
    const result = actions.delete().at(0);
    expect(actions["entries"]).toEqual([]);
    expect(result).toEqual(before[0]);
  });
});
