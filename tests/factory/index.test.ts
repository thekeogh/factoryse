import { beforeEach, describe, expect, it } from "vitest";

import { ERRORS } from "@core/constants";

import { Factory } from "@factory";

import { inputs } from "@tests/helpers.vitest";
import { base } from "@tests/helpers.vitest";
import { User } from "@tests/types.vitest";

/**
 * beforeEach
 *
 * @remarks
 * Apply beforeEach test in this suite.
 */
let factory: Factory<User>;
beforeEach(() => {
  factory = new Factory<User>(base);
});

/**
 * constructor
 *
 * @constructor
 * @see {@link Factory#constructor}
 */
describe("constructor", () => {
  it("should initialise with an empty entries array", () => {
    expect(factory["entries"]).toEqual([]);
  });
  it("should store the base closure upon initialisation", () => {
    expect(factory["base"]).toBeTypeOf("function");
    expect(factory["base"]).toBeTruthy();
  });
});

/**
 * make().
 *
 * @function
 * @see {@link Factory#make}
 */
describe("make()", () => {
  it("should throw an error for non-numeric count values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => factory.make(i as number)).toThrowError(ERRORS.COUNT_INVALID);
    });
  });
  it("should throw an error for count values less than 1", () => {
    expect(() => factory.make(0)).toThrowError(ERRORS.COUNT_INVALID);
    expect(() => factory.make(-1)).toThrowError(ERRORS.COUNT_INVALID);
  });
  it("creates a single entry by default", () => {
    factory.make();
    expect(factory["entries"]).toHaveLength(1);
  });
  it("creates a single entry when count is 1", () => {
    factory.make(1);
    expect(factory["entries"]).toHaveLength(1);
  });
  it("creates three entries when count is 3", () => {
    factory.make(3);
    expect(factory["entries"]).toHaveLength(3);
  });
  it("creates one hundred entries when count is 100", () => {
    factory.make(100);
    expect(factory["entries"]).toHaveLength(100);
  });
  it("accumulates entries without resetting", () => {
    factory.make(3);
    expect(factory["entries"]).toHaveLength(3);
    factory.make(7);
    expect(factory["entries"]).toHaveLength(10);
  });
  it("provides access to action methods", () => {
    const result = factory.make(1);
    expect(result.get).toBeTypeOf("function");
    expect(result.set).toBeTypeOf("function");
    expect(result.delete).toBeTypeOf("function");
  });
});
