import { beforeEach, describe, expect, it } from "vitest";

import { Adaptable, Closure } from "@types";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index";
import { Queries } from "@factory/queries/index";

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
let query: Queries<User>;
beforeEach(() => {
  count = 5;
  factory = new Factory<User>(base);
  actions = factory.make(count);
});

/**
 * constructor
 *
 * @constructor
 * @see {@link Actions#constructor}
 */
describe("constructor", () => {
  it("assigns the entries array to the Actions instance", () => {
    expect(factory["entries"]).toEqual(actions["entries"]);
  });
});

/**
 * get()
 *
 * @function
 * @see {@link Actions#get}
 */
describe("get()", () => {
  beforeEach(() => {
    query = actions.get();
  });

  it("updates the action property to 'get' in Queries instance", () => {
    expect(query["action"]).toBe("get");
  });
  it("provides access to the query methods", () => {
    expect(query.all).toBeTypeOf("function");
    expect(query.any).toBeTypeOf("function");
    expect(query.at).toBeTypeOf("function");
    expect(query.between).toBeTypeOf("function");
    expect(query.by).toBeTypeOf("function");
    expect(query.first).toBeTypeOf("function");
    expect(query.last).toBeTypeOf("function");
    expect(query.pick).toBeTypeOf("function");
  });
});

/**
 * set()
 *
 * @function
 * @see {@link Actions#set}
 */
describe("set()", () => {
  let source: Closure<Adaptable<User>>;
  beforeEach(() => {
    source = faker => ({ id: faker.string.uuid() });
    query = actions.set(source);
  });

  it("updates the action property to 'set' in Queries instance", () => {
    expect(query["action"]).toBe("set");
  });
  it("assigns the input source to the 'source' property in Queries instance", () => {
    expect(query["source"]).toEqual(source);
  });
  it("provides access to the query methods", () => {
    expect(query.all).toBeTypeOf("function");
    expect(query.any).toBeTypeOf("function");
    expect(query.at).toBeTypeOf("function");
    expect(query.between).toBeTypeOf("function");
    expect(query.by).toBeTypeOf("function");
    expect(query.first).toBeTypeOf("function");
    expect(query.last).toBeTypeOf("function");
    expect(query.pick).toBeTypeOf("function");
  });
});

/**
 * delete()
 *
 * @function
 * @see {@link Actions#delete}
 */
describe("delete()", () => {
  beforeEach(() => {
    query = actions.delete();
  });

  it("updates the action property to 'delete' in Queries instance", () => {
    expect(query["action"]).toBe("delete");
  });
  it("provides access to the query methods", () => {
    expect(query.all).toBeTypeOf("function");
    expect(query.any).toBeTypeOf("function");
    expect(query.at).toBeTypeOf("function");
    expect(query.between).toBeTypeOf("function");
    expect(query.by).toBeTypeOf("function");
    expect(query.first).toBeTypeOf("function");
    expect(query.last).toBeTypeOf("function");
    expect(query.pick).toBeTypeOf("function");
  });
});
