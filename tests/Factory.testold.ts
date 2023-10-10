import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it } from "vitest";

import { Factory } from "@src/Factory";

/**
 * Defines the types used in the tests.
 */
interface User {
  name: string;
  email: string;
  age: number;
  nickname?: string;
  dob?: Date;
  address?: {
    line1: string;
    country: {
      code: string;
      name: string;
    };
  };
}
interface UserValues {
  dynamic: User;
}

/**
 * Define some constants we can use across all tests.
 */
const user: UserValues = {
  dynamic: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 20, max: 99 }),
    nickname: faker.internet.userName(),
    dob: faker.date.birthdate(),
    address: {
      line1: faker.location.streetAddress(),
      country: {
        code: faker.location.countryCode(),
        name: faker.location.country(),
      },
    },
  },
};

/**
 * A factory instance that can be used across all tests.
 */
let factory: Factory<User>;

/**
 * Create a default factory instance that can be utilised in various tests.
 *
 * @remarks
 * This factory will serve as the foundation for most tests, but it can be customized or overridden when specific test
 * scenarios require different data. Essentially, this is the factory configuration used most frequently.
 */
beforeEach(() => {
  factory = new Factory({
    name: user.dynamic.name,
    email: user.dynamic.email,
    age: user.dynamic.age,
  });
});

/**
 * constructor()
 */
describe("constructor()", () => {
  it("Initialises the source schema correctly", () => {
    expect(factory["source"]).toEqual({
      name: user.dynamic.name,
      email: user.dynamic.email,
      age: user.dynamic.age,
    });
  });
  it("Initialises the target schema correctly", () => {
    expect(factory["target"]).toEqual({
      name: user.dynamic.name,
      email: user.dynamic.email,
      age: user.dynamic.age,
    });
  });
});

/**
 * get()
 */
describe("get()", () => {
  it("Returns the target schema", () => {
    expect(factory.get()).toEqual({
      name: user.dynamic.name,
      email: user.dynamic.email,
      age: user.dynamic.age,
    });
  });
});

/**
 * add()
 */
describe("add()", () => {
  it("Returns an instance of the factory", () => {
    expect(factory.add("username", user.dynamic.nickname)).toBeInstanceOf(Factory);
  });
  it("Throws an error if the key already exists", () => {
    expect(factory.get().name).toBeTruthy();
    expect(() => factory.add("name", user.dynamic.name)).toThrowError(
      "The key 'name' already exists in the factory. To update this value, please use the 'modify()' method."
    );
  });
  it("Throws an error if the key already exists as undefined", () => {
    factory.modify("name", undefined);
    expect(factory.get().name).toBeUndefined();
    expect(() => factory.add("name", user.dynamic.name)).toThrowError(
      "The key 'name' already exists in the factory. To update this value, please use the 'modify()' method."
    );
  });
  it("Throws an error if the key already exists as null", () => {
    factory.modify("name", null);
    expect(factory.get().name).toBeNull();
    expect(() => factory.add("name", user.dynamic.name)).toThrowError(
      "The key 'name' already exists in the factory. To update this value, please use the 'modify()' method."
    );
  });
  it("Throws an error if the key already exists as false", () => {
    factory.modify("name", false);
    expect(factory.get().name).toBe(false);
    expect(() => factory.add("name", user.dynamic.name)).toThrowError(
      "The key 'name' already exists in the factory. To update this value, please use the 'modify()' method."
    );
  });
  it("Adds the new top level key to the target object (that is not part of the interface)", () => {
    expect(factory.get()).not.toHaveProperty("foo");
    factory.add("foo", "bar");
    expect(factory.get().foo).toBe("bar");
  });
  it("Adds the new top level key to the target object (that is part of the interface)", () => {
    expect(factory.get()).not.toHaveProperty("nickname");
    factory.add("nickname", user.dynamic.nickname);
    expect(factory.get().nickname).toBe(user.dynamic.nickname);
  });
  it("Adds the new second level key to the target object (that is not part of the interface)", () => {
    expect(factory.get()).not.toHaveProperty("foo");
    factory.add("foo.bar", "baz");
    expect(factory.get().foo.bar).toBe("baz");
  });
  it("Adds the new second level key to the target object (that is part of the interface)", () => {
    expect(factory.get()).not.toHaveProperty("address");
    factory.add("address.line1", user.dynamic.address?.line1);
    expect(factory.get().address?.line1).toBe(user.dynamic.address?.line1);
  });
  it("Adds a new third level key to the target object", () => {
    expect(factory.get()).not.toHaveProperty("foo");
    factory.add("foo.bar.baz", user.dynamic.nickname);
    expect(factory.get().foo.bar.baz).toBe(user.dynamic.nickname);
  });
});

/**
 * modify()
 */
describe("modify()", () => {
  it("Returns an instance of the factory", () => {
    expect(factory.modify("name", user.dynamic.name)).toBeInstanceOf(Factory);
  });
  it("Throws an error if the key does not exist", () => {
    expect(factory.get()).not.toHaveProperty("foo");
    expect(() => factory.modify("foo", "bar")).toThrowError(
      "The key 'foo' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
  it("Modifies the key in the target object (that is not part of the interface)", () => {
    factory.add("foo", "bar");
    expect(factory.get()).toHaveProperty("foo");
    factory.modify("foo", "baz");
    expect(factory.get().foo).toBe("baz");
  });
  it("Modifies the key in the target object (that is part of the interface)", () => {
    expect(factory.get()).toHaveProperty("name");
    factory.modify("name", user.dynamic.name);
    expect(factory.get().name).toBe(user.dynamic.name);
  });
  it("Modifies the key in the target object if it is false", () => {
    factory.add("foo", false);
    expect(factory.get()).toHaveProperty("foo", false);
    factory.modify("foo", "baz");
    expect(factory.get().foo).toBe("baz");
  });
  it("Modifies the key in the target object if it is null", () => {
    factory.add("foo", null);
    expect(factory.get().foo).toBeNull();
    factory.modify("foo", "baz");
    expect(factory.get().foo).toBe("baz");
  });
  it("Modifies the key in the target object if it is undefined", () => {
    factory.add("foo", undefined);
    expect(factory.get().foo).toBeUndefined();
    factory.modify("foo", "baz");
    expect(factory.get().foo).toBe("baz");
  });
});

/**
 * remove()
 */
describe("remove()", () => {
  it("Returns an instance of the factory", () => {
    expect(factory.remove("name")).toBeInstanceOf(Factory);
  });
  it("Throws an error if the key does not exist", () => {
    expect(factory.get()).not.toHaveProperty("foo");
    expect(() => factory.remove("foo")).toThrowError(
      "The key 'foo' does not exist in the factory. To add this value, please use the 'add()' method."
    );
  });
  it("Removes the key from the target object (that is not part of the interface)", () => {
    factory.add("foo", "bar");
    expect(factory.get()).toHaveProperty("foo");
    factory.remove("foo");
    expect(factory.get()).not.toHaveProperty("foo");
  });
  it("Removes the key from the target object (that is part of the interface)", () => {
    expect(factory.get()).toHaveProperty("name");
    factory.remove("name");
    expect(factory.get()).not.toHaveProperty("name");
  });
  it("Removes the key in the target object if it is false", () => {
    factory.add("foo", false);
    expect(factory.get()).toHaveProperty("foo", false);
    factory.remove("foo");
    expect(factory.get()).not.toHaveProperty("foo");
  });
  it("Removes the key in the target object if it is null", () => {
    factory.add("foo", null);
    expect(factory.get().foo).toBeNull();
    factory.remove("foo");
    expect(factory.get()).not.toHaveProperty("foo");
  });
  it("Removes the key in the target object if it is undefined", () => {
    factory.add("foo", undefined);
    expect(factory.get().foo).toBeUndefined();
    factory.remove("foo");
    expect(factory.get()).not.toHaveProperty("foo");
  });
});
