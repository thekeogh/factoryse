# Factoryse

[![build](https://github.com/thekeogh/factoryse/actions/workflows/release.yml/badge.svg)](https://github.com/thekeogh/factoryse/actions) [![semantic-release: npm](https://img.shields.io/badge/semantic--release-npm-CB0000?logo=semantic-release)](https://github.com/semantic-release/semantic-release) [![node.js: >=16.20.2](https://img.shields.io/badge/node.js-%3E=16.20.2-036E02?logo=node.js)](https://nodejs.org) 

Factoryse is a test factory library built with [TypeScript](https://www.typescriptlang.org/), designed to streamline the creation of test data for your [Node.js](https://nodejs.org/) applications. Craft and manage test objects effortlessly, optimising the efficiency of your testing workflow. This project draws inspiration from Ruby's renowned [Factory Bot](https://github.com/thoughtbot/factory_bot), bringing similar ease and consistency to the world of TypeScript and Node.js testing.

Factoryse is designed to streamline the creation of test data, offering a simple and efficient approach to generate random (or deterministic, if preferred) data, thereby reducing redundancy in your testing setup.

Factoryse is compatible with any modern testing suite, including [Vitest](https://vitest.dev/) and [Jest](https://jestjs.io/), without being tied to any specific one.

## Install

```shell
npm install --save-dev factoryse
```

## How to use

### Defining a factory

First, define your factory structure. This involves specifying the data model and creating the factory instance.

```typescript
// Define the User shape
interface User {
  email: string;
  createdAt?: Date;
}

// Create the user factory
const user = new Factory<User>(faker => ({
  email: faker.internet.email()
}));
```

> It's recommended to use [faker](https://fakerjs.dev/) during factory instantiation for generating diverse random data.

### Generating entries

Generate a single entry:

```typescript
const factory = user.make();
// Generates: [{ email: "Jo65@gmail.com" }]
```

To generate multiple entries:

```typescript
const factory = user.make(2);
// Generates: [{ email: "Jo65@gmail.com" }, { email: "Alv38@hotmail.com" }]
```

### Retrieving entries

Leverage the `get()` action to access entries created by your Factory. Factoryse offers a variety of query methods to facilitate this retrieval process.

```typescript
// Retrieve all entries
users.get().all(); // User[]

// Retrieve the first entry or the first (`n: number`) entries
users.get().first(); // User[]
users.get().first(n); // User[]

// Retrieve the last entry or the last (`n: number`) entries
users.get().last(); // User[]
users.get().last(n); // User[]

// Retrieve a random entry or multiple random (`n: number`) entries
users.get().any(); // User[]
users.get().any(n); // User[]

// Retrieve a single entry by its index (`n: number`)
users.get().at(n); // User

// Retrieve multiple entries by their index (`n: number[]`)
users.get().pick(n); // User[]

// Retrieve multiple entries between indexes (`start: number, end: number`)
users.get().between(start, end); // User[]

// Retrieve multiple entries by criteria (`c: Partial<User>`)
users.get().by(c); // User[]
```

### Editing entries

Leverage the `set(source)` action to edit entries in your Factory. Factoryse offers a variety of query methods to facilitate this editing process. Each method used for editing entries will return the modified entries. To retrieve the complete set of entries from the factory after making edits, refer to the `get()` action detailed in the [Retrieving Entries](#retrieving-entries) section.

```typescript
// Closure to apply modifications to entries
const source = faker => ({ createdAt: faker.date.recent() })

// Update all entries
users.set(source).all(); // User[]

// Update the first entry or the first (`n: number`) entries
users.set(source).first(); // User[]
users.set(source).first(n); // User[]

// Update the last entry or the last (`n: number`) entries
users.set(source).last(); // User[]
users.set(source).last(n); // User[]

// Update a random entry or multiple random (`n: number`) entries
users.set(source).any(); // User[]
users.set(source).any(n); // User[]

// Update a single entry by its index (`n: number`)
users.set(source).at(n); // User

// Update multiple entries by their index (`n: number[]`)
users.set(source).pick(n); // User[]

// Update multiple entries between indexes (`start: number, end: number`)
users.set(source).between(start, end); // User[]

// Update multiple entries by criteria (`c: Partial<User>`)
users.set(source).by(c); // User[]
```

### Deleting entries

Leverage the `delete()` action to delete entries from your Factory. Factoryse offers a variety of query methods to facilitate this deleting process. Each method used for deleting entries will return the deleted entries. To retrieve the complete set of entries from the factory after making deletions, refer to the `get()` action detailed in the [Retrieving Entries](#retrieving-entries) section.

```typescript
// Delete all entries
users.delete().all(); // User[]

// Delete the first entry or the first (`n: number`) entries
users.delete().first(); // User[]
users.delete().first(n); // User[]

// Delete the last entry or the last (`n: number`) entries
users.delete().last(); // User[]
users.delete().last(n); // User[]

// Delete a random entry or multiple random (`n: number`) entries
users.delete().any(); // User[]
users.delete().any(n); // User[]

// Delete a single entry by its index (`n: number`)
users.delete().at(n); // User

// Delete multiple entries by their index (`n: number[]`)
users.delete().pick(n); // User[]

// Delete multiple entries between indexes (`start: number, end: number`)
users.delete().between(start, end); // User[]

// Delete multiple entries by criteria (`c: Partial<User>`)
users.delete().by(c); // User[]
```