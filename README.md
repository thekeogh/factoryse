# Factoryse

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

Factoryse is a test factory library built with [TypeScript](https://www.typescriptlang.org/), designed to streamline the creation of test data for your [Node.js](https://nodejs.org/) applications. Craft and manage test objects effortlessly, optimising the efficiency of your testing workflow. This project draws inspiration from Ruby's renowned [Factory Bot](https://github.com/thoughtbot/factory_bot), bringing similar ease and consistency to the world of TypeScript and Node.js testing.

Factoryse is compatible with any modern testing suite, including [Vitest](https://vitest.dev/) and [Jest](https://jestjs.io/), without being tied to any specific one.

----

**Factoryse is currently in active development. Comprehensive details will be provided here in the near future.**

----

## Install

```shell
npm install --save-dev factoryse
```

## Usage

### Initialise 

To begin, initialise your factory with the initial data for your schema:

```typescript
import { Factory } from "factoryse";

interface User {
  name: string;
  tags: string[];
  address: {
    line1: string;
  }
};

const user = new Factory<User>({
  name: "Jon Jones",
  tags: ["male", "manager"],
  address: {
    line1: "66 Richmond Road",
  },
});
```

> The specification of the type `<User>` during Factory initialisation is entirely optional.

### `spawn(count: number, data: (faker: Faker) => T)`

To create multiple `Factory` instances simultaneously, you can utilise the `spawn` helper method, which generates an array of `Factory` instances:

```typescript
import { spawn } from "factoryse";

// Spawn an array of 5 Factory instances
const users: Factory<User>[] = spawn(5, faker => ({
  name: faker.person.fullName(),
}));
```

When initialising your objects, you have the flexibility to use the [Faker](https://github.com/faker-js/faker) closure to easily generate random data. However, if you prefer, you can provide static strings or values instead of random data.

### `add(key: string, value: any)`

This method adds a new key-value pair to the object. You have the flexibility to use dot notation for nesting keys within your schema:

```typescript
// Adding a top-level key
factory.add("foo", "bar");

// Adding a nested key
factory.add("foo.bar", "baz")
```

For the sake of maintaining test stability, Factoryse will raise an error if the specified key already exists within the schema. To update existing values in your schema, it's advisable to use the `modify()` or `assign()` methods.

> Please note that Factoryse doesn't strictly adhere to the specified interface (e.g., `User`) and allows the addition of keys and values with any name and type to the object. This flexibility enables you to test scenarios with incorrect value types and additional keys that aren't defined in the interface.

### `modify(key: string, value: any)`

This method modifies a value in the object. You have the flexibility to use dot notation for modifying nested keys within your schema:

```typescript
// Modify a top-level key
factory.modify("foo", "bar");

// Modifying a nested key
factory.modify("foo.bar", "baz")
```

For the sake of maintaining test stability, Factoryse will raise an error if the specified key does not exist within the schema. To add new values to your schema, it's advisable to use the `add()` or `assign()` methods.

> It's important to be aware that Factoryse doesn't strictly adhere to the specified interface (e.g., `User`) and provides flexibility in modifying values of different types than what the interface demands. This flexibility allows you to conduct tests involving scenarios with incorrect value types and the addition of keys that aren't originally defined in the interface.

### `remove(key: string)`

This method removes key-value pairs from the object. You have the flexibility to use dot notation for removing nested keys within your schema:

```typescript
// Remove a top-level key
factory.remove("foo");

// Removing a nested key
factory.remove("foo.bar")
```

For the sake of maintaining test stability, Factoryse will raise an error if the specified key does not exist within the schema.

### `assign(source: Record<string, any>, mergeArrays: boolean = false)`

This method facilitates the merging of the source schema with your object, with the source schema taking precedence over the target object.

```typescript
// Merge a source object into your target
factory.assign({
  age: 42,
  tags: ["boss"],
  address: {
    line1: "23 Derton Road, London",
    country: "GB"
  }
});
```

When `mergeArrays` is set to `false` (the default), arrays will not be merged; instead, the source array will overwrite the target array. In this case, the result would be:

```json
{
  "name": "Jon Jones",
  "age": 42,
  "tags": ["boss"],
  "address": {
    "line1": "23 Derton Road, London",
    "country": "GB"
  },
}
```

If `mergeArrays` was set to `true`, the result would be:

```json
{
  "name": "Jon Jones",
  "age": 42,
  "tags": ["male", "manager", "boss"],
  "address": {
    "line1": "23 Derton Road, London",
    "country": "GB"
  },
}
```

> It's worth noting that Factoryse offers flexibility by not strictly adhering to the specified interface (e.g., `User`). This flexibility allows you to test scenarios with different value types and the addition of keys not originally defined in the interface.

### `reset()`

This method restores the target object to its initial state as defined during instantiation. Be cautious as this action permanently erases any changes made to the object since its creation.

```typescript
// Reset the target back to its original state
factory.reset();
```

### `get()`

This method provides you with the resulting schema object after all modifications have been applied.

```typescript
// Retrieve the current schema
factory.get()
```

