import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { Factory } from "@src/Factory";

/**
 * Defines the types used in the tests.
 */
interface User {
  name: string;
  tags: string[];
  location: {
    country: string;
    address: {
      line1: string;
    };
  };
}

/**
 * A factory instance that can be used and overwritten across all tests.
 */
let factory: Factory<User>;

/**
 * Define some test data we can share across all tests.
 */
const user: User = {
  name: faker.person.fullName({ sex: "male" }),
  tags: [faker.lorem.slug(2), faker.lorem.slug(1)],
  location: {
    country: faker.location.countryCode(),
    address: {
      line1: faker.location.streetAddress(false),
    },
  },
};
const name = faker.person.fullName({ sex: "female" });
const tags = [faker.lorem.slug(3), faker.lorem.slug(2), faker.lorem.slug(1)];
const country = faker.location.countryCode();
const line1 = faker.location.streetAddress(true);
const str = faker.word.sample();
const num = faker.number.int();
const bool = faker.datatype.boolean();
const arr = [faker.lorem.slug(3), faker.lorem.slug(3), faker.lorem.slug(3)];
const obj = { foo: faker.word.adjective(), bar: { baz: faker.word.adverb() } };

/**
 * Create a default factory instance that can be utilised in various tests.
 *
 * @remarks
 * This factory will serve as the foundation for most tests, but it can be customised or overridden when specific test
 * scenarios require different data. Essentially, this is the factory configuration used most frequently.
 */
beforeEach(() => {
  factory = new Factory<User>(user);
});

/**
 * Constructor
 *
 * @constructor
 * @see {@link Factory#constructor}
 */
describe("Constructor", () => {
  it("Initialises as a Factory instance", () => {
    expect(factory).toBeInstanceOf(Factory);
  });
  it("Correctly sets the source property", () => {
    expect(factory["source"]).toEqual(user);
  });
  it("Correctly sets the target property", () => {
    expect(factory["target"]).toEqual(user);
  });
  it("Creates a shallow copy on the target property", () => {
    factory.add("foo", str);
    expect(user).not.toEqual(factory["target"]);
    expect(user).not.toHaveProperty("foo");
  });
});

/**
 * Add
 *
 * @function
 * @see {@link Factory#add}
 */
describe("Add", () => {
  it("Does not alter the source property", () => {
    factory.add("foo", str);
    expect(factory.get().foo).toBe(str);
    expect(factory["source"]).not.toHaveProperty("foo");
  });
  it("Adds a top level key to the schema", () => {
    factory.add("foo", str);
    expect(factory.get().foo).toBe(str);
  });
  it("Adds a second level key to the schema", () => {
    factory.add("foo.bar", str);
    expect(factory.get().foo.bar).toBe(str);
  });
  it("Adds a third level key to the schema", () => {
    factory.add("foo.bar.baz", str);
    expect(factory.get().foo.bar.baz).toBe(str);
  });
  it("Adds a an array to the schema", () => {
    factory.add("foo", arr);
    expect(factory.get().foo).toEqual(arr);
  });
  it("Adds a an object to the schema", () => {
    factory.add("foo.bar", obj);
    expect(factory.get().foo.bar).toEqual(obj);
  });
  it("Adds a a boolean to the schema", () => {
    factory.add("foo.bar.baz", bool);
    expect(factory.get().foo.bar.baz).toBe(bool);
  });
  it("Adds a a number to the schema", () => {
    factory.add("foo", num);
    expect(factory.get().foo).toBe(num);
  });
  it("Errors if the top level key already exists", () => {
    expect(() => factory.add("name", name)).toThrowError(
      "The key 'name' already exists in the factory. To update this value, please use the 'modify()' method."
    );
  });
  it("Errors if the second level key already exists", () => {
    expect(() => factory.add("location.country", country)).toThrowError(
      "The key 'location.country' already exists in the factory. To update this value, please use the 'modify()' method."
    );
  });
  it("Errors if the third level key already exists", () => {
    expect(() => factory.add("location.address.line1", line1)).toThrowError(
      "The key 'location.address.line1' already exists in the factory. To update this value, please use the 'modify()' method."
    );
  });
});

/**
 * Modify
 *
 * @function
 * @see {@link Factory#modify}
 */
describe("Modify", () => {
  it("Does not alter the source property", () => {
    factory.modify("name", name);
    expect(factory.get().name).toBe(name);
    expect(factory["source"].name).not.toBe(name);
  });
  it("Modifies a top level key to the schema", () => {
    expect(factory.get().name).toBe(user.name);
    factory.modify("name", name);
    expect(factory.get().name).toBe(name);
  });
  it("Modifies a second level key to the schema", () => {
    expect(factory.get().location.country).toBe(user.location.country);
    factory.modify("location.country", country);
    expect(factory.get().location.country).toBe(country);
  });
  it("Modifies a third level key to the schema", () => {
    expect(factory.get().location.address.line1).toBe(user.location.address.line1);
    factory.modify("location.address.line1", line1);
    expect(factory.get().location.address.line1).toBe(line1);
  });
  it("Modifies an array to the schema", () => {
    expect(factory.get().tags).toEqual(user.tags);
    factory.modify("tags", tags);
    expect(factory.get().tags).toEqual(tags);
  });
  it("Modifies an object to the schema", () => {
    factory.add("foo.bar", user.location);
    expect(factory.get().foo.bar).toEqual(user.location);
    factory.modify("foo.bar", obj);
    expect(factory.get().foo.bar).toEqual(obj);
  });
  it("Modifies a boolean to the schema", () => {
    factory.add("foo", true);
    expect(factory.get().foo).toBe(true);
    factory.modify("foo", false);
    expect(factory.get().foo).toBe(false);
  });
  it("Modifies a number to the schema", () => {
    factory.add("foo.bar.baz", 0);
    expect(factory.get().foo.bar.baz).toBe(0);
    factory.modify("foo.bar.baz", num);
    expect(factory.get().foo.bar.baz).toBe(num);
  });
  it("Errors if the top level key does not exist", () => {
    expect(() => factory.modify("foo", str)).toThrowError(
      "The key 'foo' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
  it("Errors if the second level key does not exist", () => {
    expect(() => factory.modify("foo.bar", str)).toThrowError(
      "The key 'foo.bar' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
  it("Errors if the third level key does not exist", () => {
    expect(() => factory.modify("foo.bar.baz", str)).toThrowError(
      "The key 'foo.bar.baz' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
});

/**
 * Remove
 *
 * @function
 * @see {@link Factory#remove}
 */
describe("Remove", () => {
  it("Does not alter the source property", () => {
    factory.remove("name");
    expect(factory.get()).not.toHaveProperty("name");
    expect(factory["source"].name).toBe(user.name);
  });
  it("Removes a top level key to the schema", () => {
    expect(factory.get()).toHaveProperty("name");
    factory.remove("name");
    expect(factory.get()).not.toHaveProperty("name");
  });
  it("Removes a second level key to the schema", () => {
    expect(factory.get().location).toHaveProperty("country");
    factory.remove("location.country");
    expect(factory.get().location).not.toHaveProperty("country");
  });
  it("Removes a third level key to the schema", () => {
    expect(factory.get().location.address).toHaveProperty("line1");
    factory.remove("location.address.line1");
    expect(factory.get().location.address).not.toHaveProperty("line1");
  });
  it("Removes an array from the schema", () => {
    expect(factory.get()).toHaveProperty("tags");
    factory.remove("tags");
    expect(factory.get()).not.toHaveProperty("tags");
  });
  it("Removes an object from the schema", () => {
    expect(factory.get()).toHaveProperty("location");
    factory.remove("location");
    expect(factory.get()).not.toHaveProperty("location");
  });
  it("Removes a boolean from the schema", () => {
    factory.add("foo", true);
    expect(factory.get().foo).toBe(true);
    factory.remove("foo");
    expect(factory.get()).not.toHaveProperty("foo");
  });
  it("Removes a boolean from the schema", () => {
    factory.add("foo", num);
    expect(factory.get().foo).toBe(num);
    factory.remove("foo");
    expect(factory.get()).not.toHaveProperty("foo");
  });
  it("Errors if the top level key does not exist", () => {
    expect(() => factory.remove("foo")).toThrowError(
      "The key 'foo' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
  it("Errors if the second level key does not exist", () => {
    expect(() => factory.remove("foo.bar")).toThrowError(
      "The key 'foo.bar' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
  it("Errors if the third level key does not exist", () => {
    expect(() => factory.remove("foo.bar.baz")).toThrowError(
      "The key 'foo.bar.baz' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
});

/**
 * Assign
 *
 * @function
 * @see {@link Factory#assign}
 */
describe("Assign", () => {
  it("Does not alter the source property", () => {
    factory.assign({ name });
    expect(factory.get().name).toBe(name);
    expect(factory["source"].name).toBe(user.name);
  });
  it("Assigns a top level key to the schema and does not affect the rest of the schema", () => {
    expect(factory.get().name).toBe(user.name);
    factory.assign({ name });
    expect(factory.get().name).toBe(name);
    expect(factory.get().tags).toEqual(user.tags);
    expect(factory.get().location).toEqual(user.location);
  });
  it("Assigns a second level key to the schema and does not affect the rest of the schema", () => {
    expect(factory.get().location.country).toBe(user.location.country);
    factory.assign({ location: { country } });
    expect(factory.get().name).toBe(user.name);
    expect(factory.get().tags).toEqual(user.tags);
    expect(factory.get().location.country).toBe(country);
    expect(factory.get().location.address).toEqual(user.location.address);
  });
  it("Assigns a third level key to the schema and does not affect the rest of the schema", () => {
    expect(factory.get().location.address.line1).toBe(user.location.address.line1);
    factory.assign({ location: { address: { line1 } } });
    expect(factory.get().name).toBe(user.name);
    expect(factory.get().tags).toEqual(user.tags);
    expect(factory.get().location.country).toBe(user.location.country);
    expect(factory.get().location.address.line1).toBe(line1);
  });
  it("Does not merge arrays by default", () => {
    expect(factory.get().tags).toEqual(user.tags);
    factory.assign({ tags });
    expect(factory.get().tags).toEqual(tags);
  });
  it("Does not merge nested arrays by default", () => {
    factory.add("location.address.tags", user.tags);
    expect(factory.get().location.address.tags).toEqual(user.tags);
    factory.assign({ location: { address: { tags } } });
    expect(factory.get().location.address.tags).toEqual(tags);
  });
  it("Does not merge arrays if explicity specified (i.e. does not merge arrays)", () => {
    expect(factory.get().tags).toEqual(user.tags);
    factory.assign({ tags }, false);
    expect(factory.get().tags).toEqual(tags);
  });
  it("Merges arrays with the source if explicity specified (i.e. does merge arrays)", () => {
    expect(factory.get().tags).toEqual(user.tags);
    factory.assign({ tags }, true);
    expect(factory.get().tags).toEqual([...user.tags, ...tags]);
  });
});

/**
 * Reset
 *
 * @function
 * @see {@link Factory#reset}
 */
describe("Reset", () => {
  it("Does nothing if target and reset are already the same", () => {
    expect(factory["source"]).toEqual(factory.get());
    factory.reset();
    expect(factory["source"]).toEqual(factory.get());
  });
  it("Resets target to source after one change", () => {
    factory.add("foo", "bar");
    expect(factory["source"]).not.toEqual(factory.get());
    factory.reset();
    expect(factory["source"]).toEqual(factory.get());
  });
  it("Resets target to source after minimal changes", () => {
    factory.add("foo", "bar");
    factory.assign({ location: { country, address: { line1 } } });
    expect(factory["source"]).not.toEqual(factory.get());
    factory.reset();
    expect(factory["source"]).toEqual(factory.get());
  });
  it("Resets target to source after substantial changes", () => {
    factory.add("foo", "bar");
    factory.modify("name", name);
    factory.modify("tags", tags);
    factory.assign({
      location: {
        country,
        tags,
        address: {
          line1,
          line2: str,
          zip: num,
        },
      },
    });
    expect(factory["source"]).not.toEqual(factory.get());
    factory.reset();
    expect(factory["source"]).toEqual(factory.get());
  });
});
