import { beforeEach, describe, expect, it, vi } from "vitest";

import { Adaptable, Closure } from "@types";

import { ERRORS } from "@core/constants.js";

import { Factory } from "@factory";

import { Actions } from "@factory/actions/index.js";
import { All } from "@factory/queries/all.js";
import { Any } from "@factory/queries/any.js";
import { At } from "@factory/queries/at.js";
import { Between } from "@factory/queries/between.js";
import { By } from "@factory/queries/by.js";
import { First } from "@factory/queries/first.js";
import { Queries } from "@factory/queries/index.js";
import { Last } from "@factory/queries/last.js";
import { Pick } from "@factory/queries/pick.js";

import { base, faker, inputs } from "@tests/helpers.vitest.js";
import { User } from "@tests/types.vitest.js";

vi.mock("@factory/queries/all.js");
vi.mock("@factory/queries/any.js");
vi.mock("@factory/queries/at.js");
vi.mock("@factory/queries/between.js");
vi.mock("@factory/queries/by.js");
vi.mock("@factory/queries/first.js");
vi.mock("@factory/queries/last.js");
vi.mock("@factory/queries/pick.js");

const mockedAll = vi.mocked(All, true);
const mockedAny = vi.mocked(Any, true);
const mockedAt = vi.mocked(At, true);
const mockedBetween = vi.mocked(Between, true);
const mockedBy = vi.mocked(By, true);
const mockedFirst = vi.mocked(First, true);
const mockedLast = vi.mocked(Last, true);
const mockedPick = vi.mocked(Pick, true);

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
  count = 5;
  factory = new Factory<User>(base);
  actions = factory.make(count);
  source = faker => ({ id: faker.string.uuid() });
});

/**
 * constructor
 *
 * @constructor
 * @see {@link Queries#constructor}
 */
describe("constructor", () => {
  it("assigns the entries array to the Queries instance", () => {
    query = actions.get();
    expect(factory["entries"]).toEqual(actions["entries"]);
    expect(actions["entries"]).toEqual(query["entries"]);
  });
});

/**
 * all()
 *
 * @function
 * @see {@link Queries#all}
 */
describe("all()", () => {
  it("sets the entries property when the All class is instantiated", () => {
    actions.get().all();
    expect(mockedAll.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes All class's get() method for 'get' action", () => {
    actions.get().all();
    expect(mockedAll.prototype.get).toBeCalledTimes(1);
  });
  it("invokes All class's set() method for 'set' action", () => {
    actions.set(source).all();
    expect(mockedAll.prototype.set).toBeCalledTimes(1);
  });
  it("invokes All class's delete() method for 'delete' action", () => {
    actions.delete().all();
    expect(mockedAll.prototype.delete).toBeCalledTimes(1);
  });
  it("should throw an error if set is called whilst entries is empty", () => {
    actions = factory.make(1);
    actions["entries"] = [];
    expect(() => actions.set(source).all()).toThrowError(ERRORS.ENTRIES_EMPTY);
  });
  it("should throw an error if delete is called whilst entries is empty", () => {
    actions = factory.make(1);
    actions["entries"] = [];
    expect(() => actions.delete().all()).toThrowError(ERRORS.ENTRIES_EMPTY);
  });
  it("does not throw an error if get is called whilst entries is empty", () => {
    actions = factory.make(1);
    actions["entries"] = [];
    expect(() => actions.get().all()).not.toThrowError(ERRORS.ENTRIES_EMPTY);
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.all()).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().all()).toThrowError(ERRORS.SOURCE_MISSING);
  });
});

/**
 * any()
 *
 * @function
 * @see {@link Queries#any}
 */
describe("any()", () => {
  it("sets the entries property when the Any class is instantiated", () => {
    actions.get().any();
    expect(mockedAny.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes Any class's get() method for 'get' action", () => {
    actions.get().any();
    expect(mockedAny.prototype.get).toBeCalledTimes(1);
  });
  it("invokes Any class's set() method for 'set' action", () => {
    actions.set(source).any();
    expect(mockedAny.prototype.set).toBeCalledTimes(1);
  });
  it("invokes Any class's delete() method for 'delete' action", () => {
    actions.delete().any();
    expect(mockedAny.prototype.delete).toBeCalledTimes(1);
  });
  it("should throw an error for non-numeric count values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => actions.get().any(i as number)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.set(source).any(i as number)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.delete().any(i as number)).toThrowError(ERRORS.COUNT_INVALID);
    });
  });
  it("should throw an error for count values less than 1", () => {
    [0, -1].forEach(i => {
      expect(() => actions.get().any(i)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.set(source).any(i)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.delete().any(i)).toThrowError(ERRORS.COUNT_INVALID);
    });
  });
  it("should throw an error if the count exceeds the entries length", () => {
    expect(() => actions.get().any(count + 1)).toThrowError(ERRORS.COUNT_EXCEEDS_DATA);
  });
  it("does not throw an error if the count is the same as the entries length", () => {
    expect(() => actions.get().any(count)).not.toThrowError();
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.any()).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().any()).toThrowError(ERRORS.SOURCE_MISSING);
  });
});

/**
 * at()
 *
 * @function
 * @see {@link Queries#at}
 */
describe("at()", () => {
  it("sets the entries property when the At class is instantiated", () => {
    actions.get().at();
    expect(mockedAt.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes At class's get() method for 'get' action", () => {
    actions.get().at();
    expect(mockedAt.prototype.get).toBeCalledTimes(1);
  });
  it("invokes At class's set() method for 'set' action", () => {
    actions.set(source).at();
    expect(mockedAt.prototype.set).toBeCalledTimes(1);
  });
  it("invokes At class's delete() method for 'delete' action", () => {
    actions.delete().at();
    expect(mockedAt.prototype.delete).toBeCalledTimes(1);
  });
  it("does not throw an error for an index of 0", () => {
    expect(() => actions.get().at(0)).not.toThrowError();
    expect(() => actions.set(source).at(0)).not.toThrowError();
    expect(() => actions.delete().at(0)).not.toThrowError();
  });
  it("should throw an error for non-numeric index values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => actions.get().at(i as number)).toThrowError(ERRORS.INDEX_INVALID);
      expect(() => actions.set(source).at(i as number)).toThrowError(ERRORS.INDEX_INVALID);
      expect(() => actions.delete().at(i as number)).toThrowError(ERRORS.INDEX_INVALID);
    });
  });
  it("should throw an error for index values less than 0", () => {
    expect(() => actions.get().at(-1)).toThrowError(ERRORS.INDEX_INVALID);
    expect(() => actions.set(source).at(-1)).toThrowError(ERRORS.INDEX_INVALID);
    expect(() => actions.delete().at(-1)).toThrowError(ERRORS.INDEX_INVALID);
  });
  it("should throw an error if the index exceeds the entries length", () => {
    expect(() => actions.get().at(count)).toThrowError(ERRORS.INDEX_EXCEEDS_DATA);
  });
  it("does not throw an error if the index is the same as the entries length", () => {
    expect(() => actions.get().at(count - 1)).not.toThrowError();
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.at()).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().at()).toThrowError(ERRORS.SOURCE_MISSING);
  });
});

/**
 * between()
 *
 * @function
 * @see {@link Queries#between}
 */
describe("between()", () => {
  it("sets the entries property when the Between class is instantiated", () => {
    actions.get().between();
    expect(mockedBetween.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes Between class's get() method for 'get' action", () => {
    actions.get().between();
    expect(mockedBetween.prototype.get).toBeCalledTimes(1);
  });
  it("invokes Between class's set() method for 'set' action", () => {
    actions.set(source).between();
    expect(mockedBetween.prototype.set).toBeCalledTimes(1);
  });
  it("invokes Between class's delete() method for 'delete' action", () => {
    actions.delete().between();
    expect(mockedBetween.prototype.delete).toBeCalledTimes(1);
  });
  it("should throw an error for non-numeric start values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => actions.get().between(i as number)).toThrowError(ERRORS.START_INVALID);
      expect(() => actions.set(source).between(i as number)).toThrowError(ERRORS.START_INVALID);
      expect(() => actions.delete().between(i as number)).toThrowError(ERRORS.START_INVALID);
    });
  });
  it("should throw an error for non-numeric end values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => actions.get().between(0, i as number)).toThrowError(ERRORS.END_INVALID);
      expect(() => actions.set(source).between(0, i as number)).toThrowError(ERRORS.END_INVALID);
      expect(() => actions.delete().between(0, i as number)).toThrowError(ERRORS.END_INVALID);
    });
  });
  it("should throw an error if the start exceeds the entries length", () => {
    expect(() => actions.get().between(count)).toThrowError(ERRORS.START_EXCEEDS_DATA);
  });
  it("does not throw an error if the start is the same as the entries length", () => {
    expect(() => actions.get().between(count - 1)).not.toThrowError();
  });
  it("should throw an error if the end exceeds the entries length", () => {
    expect(() => actions.get().between(0, count)).toThrowError(ERRORS.END_EXCEEDS_DATA);
  });
  it("does not throw an error if the end is the same as the entries length", () => {
    expect(() => actions.get().between(0, count - 1)).not.toThrowError();
  });
  it("should throw an error if the start exceeds the end argument", () => {
    expect(() => actions.get().between(1, 0)).toThrowError(ERRORS.START_EXCEEDS_END);
  });
  it("does not throw an error if the start and end are the same", () => {
    expect(() => actions.get().between(0, 0)).not.toThrowError();
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.between()).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().between()).toThrowError(ERRORS.SOURCE_MISSING);
  });
});

/**
 * by()
 *
 * @function
 * @see {@link Queries#by}
 */
describe("by()", () => {
  let criteria: Adaptable<User>;
  beforeEach(() => {
    criteria = { email: faker.internet.email() };
  });
  it("sets the entries property when the By class is instantiated", () => {
    actions.get().by(criteria);
    expect(mockedBy.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes By class's get() method for 'get' action", () => {
    actions.get().by(criteria);
    expect(mockedBy.prototype.get).toBeCalledTimes(1);
  });
  it("invokes By class's set() method for 'set' action", () => {
    actions.set(source).by(criteria);
    expect(mockedBy.prototype.set).toBeCalledTimes(1);
  });
  it("invokes By class's delete() method for 'delete' action", () => {
    actions.delete().by(criteria);
    expect(mockedBy.prototype.delete).toBeCalledTimes(1);
  });
  it("should throw an error if the criteria is missing", () => {
    // @ts-ignore
    expect(() => actions.get().by()).toThrowError(ERRORS.CRITERIA_MISSING);
    // @ts-ignore
    expect(() => actions.set(source).by()).toThrowError(ERRORS.CRITERIA_MISSING);
    // @ts-ignore
    expect(() => actions.delete().by()).toThrowError(ERRORS.CRITERIA_MISSING);
  });
  it("should throw an error for non-object criteria values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => actions.get().by(i as object)).toThrowError(ERRORS.CRITERIA_MISSING);
      expect(() => actions.set(source).by(i as object)).toThrowError(ERRORS.CRITERIA_MISSING);
      expect(() => actions.delete().by(i as object)).toThrowError(ERRORS.CRITERIA_MISSING);
    });
  });
  it("should throw an error if the entries array is empty", () => {
    actions = new Factory<User>(base).make(1);
    actions["entries"] = [];
    expect(() => actions.get().by(criteria)).toThrowError(ERRORS.ENTRIES_EMPTY);
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.by(criteria)).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().by(criteria)).toThrowError(ERRORS.SOURCE_MISSING);
  });
});

/**
 * first()
 *
 * @function
 * @see {@link Queries#first}
 */
describe("first()", () => {
  it("sets the entries property when the First class is instantiated", () => {
    actions.get().first();
    expect(mockedFirst.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes First class's get() method for 'get' action", () => {
    actions.get().first();
    expect(mockedFirst.prototype.get).toBeCalledTimes(1);
  });
  it("invokes First class's set() method for 'set' action", () => {
    actions.set(source).first();
    expect(mockedFirst.prototype.set).toBeCalledTimes(1);
  });
  it("invokes First class's delete() method for 'delete' action", () => {
    actions.delete().first();
    expect(mockedFirst.prototype.delete).toBeCalledTimes(1);
  });
  it("should throw an error for non-numeric count values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => actions.get().first(i as number)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.set(source).first(i as number)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.delete().first(i as number)).toThrowError(ERRORS.COUNT_INVALID);
    });
  });
  it("should throw an error for count values less than 1", () => {
    [0, -1].forEach(i => {
      expect(() => actions.get().first(i)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.set(source).first(i)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.delete().first(i)).toThrowError(ERRORS.COUNT_INVALID);
    });
  });
  it("should throw an error if the count exceeds the entries length", () => {
    expect(() => actions.get().first(count + 1)).toThrowError(ERRORS.COUNT_EXCEEDS_DATA);
  });
  it("does not throw an error if the count is the same as the entries length", () => {
    expect(() => actions.get().first(count)).not.toThrowError();
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.first()).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().first()).toThrowError(ERRORS.SOURCE_MISSING);
  });
});

/**
 * last()
 *
 * @function
 * @see {@link Queries#last}
 */
describe("last()", () => {
  it("sets the entries property when the Last class is instantiated", () => {
    actions.get().last();
    expect(mockedLast.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes Last class's get() method for 'get' action", () => {
    actions.get().last();
    expect(mockedLast.prototype.get).toBeCalledTimes(1);
  });
  it("invokes Last class's set() method for 'set' action", () => {
    actions.set(source).last();
    expect(mockedLast.prototype.set).toBeCalledTimes(1);
  });
  it("invokes Last class's delete() method for 'delete' action", () => {
    actions.delete().last();
    expect(mockedLast.prototype.delete).toBeCalledTimes(1);
  });
  it("should throw an error for non-numeric count values", () => {
    inputs.nonNumeric.forEach(i => {
      expect(() => actions.get().last(i as number)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.set(source).last(i as number)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.delete().last(i as number)).toThrowError(ERRORS.COUNT_INVALID);
    });
  });
  it("should throw an error for count values less than 1", () => {
    [0, -1].forEach(i => {
      expect(() => actions.get().last(i)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.set(source).last(i)).toThrowError(ERRORS.COUNT_INVALID);
      expect(() => actions.delete().last(i)).toThrowError(ERRORS.COUNT_INVALID);
    });
  });
  it("should throw an error if the count exceeds the entries length", () => {
    expect(() => actions.get().last(count + 1)).toThrowError(ERRORS.COUNT_EXCEEDS_DATA);
  });
  it("does not throw an error if the count is the same as the entries length", () => {
    expect(() => actions.get().last(count)).not.toThrowError();
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.last()).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().last()).toThrowError(ERRORS.SOURCE_MISSING);
  });
});

/**
 * pick()
 *
 * @function
 * @see {@link Queries#pick}
 */
describe("pick()", () => {
  it("sets the entries property when the Pick class is instantiated", () => {
    actions.get().pick([0]);
    expect(mockedPick.mock.calls[0][0]).toEqual(factory["entries"]);
  });
  it("invokes Pick class's get() method for 'get' action", () => {
    actions.get().pick([0]);
    expect(mockedPick.prototype.get).toBeCalledTimes(1);
  });
  it("invokes Pick class's set() method for 'set' action", () => {
    actions.set(source).pick([0, 1]);
    expect(mockedPick.prototype.set).toBeCalledTimes(1);
  });
  it("invokes Pick class's delete() method for 'delete' action", () => {
    actions.delete().pick([0, 3]);
    expect(mockedPick.prototype.delete).toBeCalledTimes(1);
  });
  it("should throw an error if the indexes argument is missing", () => {
    // @ts-ignore
    expect(() => actions.get().pick()).toThrowError(ERRORS.INDEXES_MISSING);
    // @ts-ignore
    expect(() => actions.set(source).pick()).toThrowError(ERRORS.INDEXES_MISSING);
    // @ts-ignore
    expect(() => actions.delete().pick()).toThrowError(ERRORS.INDEXES_MISSING);
  });
  it("should throw an error if the indexes argument contains a non-number value", () => {
    // @ts-ignore
    expect(() => actions.get().pick([0, "str", 4])).toThrowError(ERRORS.INDEXES_INVALID);
    // @ts-ignore
    expect(() => actions.get().pick(["str"])).toThrowError(ERRORS.INDEXES_INVALID);
  });
  it("should throw an error if the indexes argument contains negative number", () => {
    expect(() => actions.get().pick([0, -1, 4])).toThrowError(ERRORS.INDEXES_INVALID);
    expect(() => actions.get().pick([-10])).toThrowError(ERRORS.INDEXES_INVALID);
  });
  it("should throw an error for non-array index values", () => {
    inputs.nonArray.forEach(i => {
      expect(() => actions.get().pick(i as [])).toThrowError(ERRORS.INDEXES_MISSING);
      expect(() => actions.set(source).pick(i as [])).toThrowError(ERRORS.INDEXES_MISSING);
      expect(() => actions.delete().pick(i as [])).toThrowError(ERRORS.INDEXES_MISSING);
    });
  });
  it("should throw an error if an index exceeds the entries length", () => {
    expect(() => actions.get().pick([0, count])).toThrowError(ERRORS.INDEX_EXCEEDS_DATA);
  });
  it("does not throw an error if the index is the same as the entries length", () => {
    expect(() => actions.get().pick([0, count - 1])).not.toThrowError();
  });
  it("should throw an error if the action is unknown", () => {
    // @ts-ignore
    query["action"] = "unknown";
    expect(() => query.pick([0])).toThrowError(ERRORS.UNKNOWN_ACTION);
  });
  it("should throw an error if the action is set but the source is missing", () => {
    // @ts-ignore
    expect(() => actions.set().pick([0])).toThrowError(ERRORS.SOURCE_MISSING);
  });
});
