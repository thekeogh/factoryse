import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index.js";
import { By } from "@factory/queries/by.js";

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
let email: string;
let tag: string;
let bio: string;
let github: string;
beforeEach(() => {
  count = 3;
  factory = new Factory<User>(base);
  actions = factory.make(count);
  email = "find@me.com";
  tag = "seekme";
  bio = "Unofficial world champion in beer drinking.";
  github = "https://github.com/checkme";
});

/**
 * get()
 *
 * @function
 * @see {@link By#get}
 */
describe("get()", () => {
  it("returns an empty array for no results in a top level find", () => {
    expect(actions.get().by({ email: "not@found.com" })).toHaveLength(0);
  });
  it("returns a single entry for a top level find", () => {
    actions.set(() => ({ email })).any();
    expect(actions.get().by({ email })).toHaveLength(1);
  });
  it("returns multiple entries for a top level find", () => {
    actions.set(() => ({ email })).any(2);
    expect(actions.get().by({ email })).toHaveLength(2);
  });
  it("returns an empty array for no results in an array find", () => {
    expect(actions.get().by({ tags: ["nochance"] })).toHaveLength(0);
  });
  it("returns a single entry for an array find", () => {
    actions.set(faker => ({ tags: [faker.word.adjective(), tag, faker.word.noun()] })).any();
    expect(actions.get().by({ tags: [tag] })).toHaveLength(1);
  });
  it("returns multiple entries for an array find", () => {
    actions.set(faker => ({ tags: [faker.word.adjective(), tag, faker.word.noun()] })).any(2);
    expect(actions.get().by({ tags: [tag] })).toHaveLength(2);
  });
  it("returns an empty array for no results in a nested find", () => {
    expect(actions.get().by({ profile: { bio: "Catch me if you can." } })).toHaveLength(0);
  });
  it("returns a single entry for a nested find", () => {
    actions.set(() => ({ profile: { bio } })).any();
    expect(actions.get().by({ profile: { bio } })).toHaveLength(1);
  });
  it("returns multiple entries for a nested find", () => {
    actions.set(() => ({ profile: { bio } })).any(2);
    expect(actions.get().by({ profile: { bio } })).toHaveLength(2);
  });
  it("returns an empty array for no results in an unknown nested find", () => {
    expect(actions.get().by({ profile: { social: { github } } })).toHaveLength(0);
  });
  it("returns a single entry for an unknown nested find", () => {
    actions.set(() => ({ profile: { social: { github } } })).any();
    expect(actions.get().by({ profile: { social: { github } } })).toHaveLength(1);
  });
  it("returns multiple entries for an unknown nested find", () => {
    actions.set(() => ({ profile: { social: { github } } })).any(2);
    expect(actions.get().by({ profile: { social: { github } } })).toHaveLength(2);
  });
});

/**
 * set()
 *
 * @function
 * @see {@link By#set}
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

  it("updates nothing for no results in a top level find", () => {
    expect(actions.set(source).by({ email: "not@found.com" })).toHaveLength(0);
    expect(actions["entries"]).toEqual(before);
  });
  it("updates a single entry for a top level find", () => {
    actions.set(() => ({ email })).any();
    expect(actions.set(source).by({ email })).toHaveLength(1);
    expect(actions["entries"]).not.toEqual(before);
  });
  it("updates multiple entries for a top level find", () => {
    actions.set(() => ({ email })).any(2);
    expect(actions.set(source).by({ email })).toHaveLength(2);
    expect(actions["entries"]).not.toEqual(before);
  });
  it("updates nothing for no results in an array find", () => {
    expect(actions.set(source).by({ tags: ["nochance"] })).toHaveLength(0);
    expect(actions["entries"]).toEqual(before);
  });
  it("updates a single entry for an array find", () => {
    actions.set(faker => ({ tags: [faker.word.adjective(), tag, faker.word.noun()] })).any();
    expect(actions.set(source).by({ tags: [tag] })).toHaveLength(1);
    expect(actions["entries"]).not.toEqual(before);
  });
  it("updates multiple entries for an array find", () => {
    actions.set(faker => ({ tags: [faker.word.adjective(), tag, faker.word.noun()] })).any(2);
    expect(actions.set(source).by({ tags: [tag] })).toHaveLength(2);
    expect(actions["entries"]).not.toEqual(before);
  });
  it("updates nothing for no results in a nested find", () => {
    expect(actions.set(source).by({ profile: { bio: "Catch me if you can." } })).toHaveLength(0);
    expect(actions["entries"]).toEqual(before);
  });
  it("updates a single entry for a nested find", () => {
    actions.set(() => ({ profile: { bio } })).any();
    expect(actions.set(source).by({ profile: { bio } })).toHaveLength(1);
    expect(actions["entries"]).not.toEqual(before);
  });
  it("updates multiple entries for a nested find", () => {
    actions.set(() => ({ profile: { bio } })).any(2);
    expect(actions.set(source).by({ profile: { bio } })).toHaveLength(2);
    expect(actions["entries"]).not.toEqual(before);
  });
  it("updates nothing for no results in an unknown nested find", () => {
    expect(actions.set(source).by({ profile: { social: { github } } })).toHaveLength(0);
    expect(actions["entries"]).toEqual(before);
  });
  it("updates a single entry for an unknown nested find", () => {
    actions.set(() => ({ profile: { social: { github } } })).any();
    expect(actions.set(source).by({ profile: { social: { github } } })).toHaveLength(1);
    expect(actions["entries"]).not.toEqual(before);
  });
  it("updates multiple entries for an unknown nested find", () => {
    actions.set(() => ({ profile: { social: { github } } })).any(2);
    expect(actions.set(source).by({ profile: { social: { github } } })).toHaveLength(2);
    expect(actions["entries"]).not.toEqual(before);
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link By#delete}
 */
describe("delete()", () => {
  let before: User[];
  beforeEach(() => {
    before = factory["entries"].slice();
  });
  it("deletes nothing for no results in a top level find", () => {
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ email })).toHaveLength(0);
    expect(actions["entries"]).toHaveLength(count);
  });
  it("deletes a single entry for a top level find", () => {
    actions.set(() => ({ email })).any();
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ email })).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
  });
  it("deletes multiple entries for a top level find", () => {
    actions.set(() => ({ email })).any(2);
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ email })).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
  });
  it("deletes nothing for no results in an array find", () => {
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ tags: ["nochance"] })).toHaveLength(0);
    expect(actions["entries"]).toHaveLength(count);
  });
  it("deletes a single entry for an array find", () => {
    actions.set(faker => ({ tags: [faker.word.adjective(), tag, faker.word.noun()] })).any();
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ tags: [tag] })).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
  });
  it("deletes multiple entries for an array find", () => {
    actions.set(faker => ({ tags: [faker.word.adjective(), tag, faker.word.noun()] })).any(2);
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ tags: [tag] })).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
  });
  it("returns nothing for no results in a nested find", () => {
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ profile: { bio: "Catch me if you can." } })).toHaveLength(0);
    expect(actions["entries"]).toHaveLength(count);
  });
  it("deletes a single entry for a nested find", () => {
    actions.set(() => ({ profile: { bio } })).any();
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ profile: { bio } })).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
  });
  it("deletes multiple entries for a nested find", () => {
    actions.set(() => ({ profile: { bio } })).any(2);
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ profile: { bio } })).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
  });
  it("deletes nothing for no results in an unknown nested find", () => {
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ profile: { social: { github } } })).toHaveLength(0);
  });
  it("deletes a single entry for an unknown nested find", () => {
    actions.set(() => ({ profile: { social: { github } } })).any();
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ profile: { social: { github } } })).toHaveLength(1);
    expect(actions["entries"]).toHaveLength(count - 1);
  });
  it("deletes multiple entries for an unknown nested find", () => {
    actions.set(() => ({ profile: { social: { github } } })).any(2);
    expect(before).toHaveLength(count);
    expect(actions["entries"]).toHaveLength(count);
    expect(actions.delete().by({ profile: { social: { github } } })).toHaveLength(2);
    expect(actions["entries"]).toHaveLength(count - 2);
  });
});
