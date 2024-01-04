import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index";
import { All } from "@factory/queries/all";
import { Queries } from "@factory/queries/index";

import { base, faker } from "@tests/helpers.vitest";
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
let query: Queries<User>;
let source: Closure<Adaptable<User>>;
beforeEach(() => {
  count = 2;
  factory = new Factory<User>(base);
  actions = factory.make(count);
});

/**
 * get()
 *
 * @function
 * @see {@link All#get}
 */
describe("get()", () => {
  beforeEach(() => {
    query = actions.get();
  });

  it("returns an empty array if there are no entries", () => {
    actions = new Factory<User>(base).make(1);
    actions["entries"] = [];
    expect(actions.get().all()).toEqual([]);
  });
  it("returns all entries if there are entries present", () => {
    expect(query.all()).toEqual(factory["entries"]);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link All#set}
 */
describe("set()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });

  it("updates the id value only", () => {
    source = faker => ({ id: faker.string.uuid() });
    const result = actions.set(source).all();
    expect(result).not.toEqual(before);
    expect(result[0].id).not.toBe(before[0].id);
    expect(result[0].email).toBe(before[0].email);
    expect(result[1].id).not.toBe(before[1].id);
    expect(result[1].email).toBe(before[1].email);
  });
  it("updates the email value and the nested profile object", () => {
    source = faker => ({
      email: faker.internet.email(),
      profile: {
        bio: faker.lorem.paragraph(4),
        social: {
          facebook: faker.internet.url(),
        },
      },
    });
    const result = actions.set(source).all();
    expect(result).not.toEqual(before);
    expect(result[0].id).toBe(before[0].id);
    expect(result[0].email).not.toBe(before[0].email);
    expect(result[0].profile.bio).not.toBe(before[0].profile.bio);
    expect(before[0].profile.social.facebook).toBeUndefined();
    expect(result[0].profile.social.facebook).not.toBeUndefined();
    expect(result[1].id).toBe(before[1].id);
    expect(result[1].email).not.toBe(before[1].email);
    expect(result[1].profile.bio).not.toBe(before[1].profile.bio);
    expect(before[1].profile.social.facebook).toBeUndefined();
    expect(result[1].profile.social.facebook).not.toBeUndefined();
  });
  it("copies the source array over to the base and does not perform a merge", () => {
    const tags = [faker.lorem.word(), faker.word.sample()];
    source = _ => ({ tags });
    const result = actions.set(source).all();
    expect(result).not.toEqual(before);
    expect(before[0].tags).not.toEqual(tags);
    expect(result[0].tags).toEqual(tags);
    expect(before[1].tags).not.toEqual(tags);
    expect(result[1].tags).toEqual(tags);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link All#delete}
 */
describe("delete()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });
  it("deletes all entries if there is only 1 entry", () => {
    actions = new Factory<User>(base).make(1);
    before = actions["entries"].slice();
    expect(actions["entries"]).toHaveLength(1);
    const result = actions.delete().all();
    expect(actions["entries"]).toEqual([]);
    expect(result).toEqual(before);
  });
  it("deletes all entries if there are multiple", () => {
    expect(actions["entries"]).toHaveLength(count);
    const result = actions.delete().all();
    expect(actions["entries"]).toEqual([]);
    expect(result).toEqual(before);
  });
});
