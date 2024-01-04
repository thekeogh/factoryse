import { faker } from "@faker-js/faker";

import { Closure } from "@types";

import { User } from "@tests/types.vitest";

/**
 * Exports for direct use in test suites.
 *
 * @remarks
 * These exports are directly provided for use in testing, facilitating a DRY (Don't Repeat Yourself) approach by
 * reducing the necessity for multiple imports. This aids in maintaining concise and efficient test code.
 */
export { faker };

/**
 * Creates the foundational closure for initialising the factory.
 *
 * @remarks
 * This base closure is essential for setting up the factory. It specifically includes only the mandatory fields
 * required by the User interface. Optional or non-required keys are intentionally excluded to establish a minimal
 * yet complete data structure for initial use.
 */
export const base: Closure<User> = faker => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: faker.string.alphanumeric(70),
  isActive: faker.datatype.boolean(),
  tags: [faker.word.adjective(), faker.word.adverb(), faker.word.noun()],
  profile: {
    bio: faker.lorem.paragraph(),
    social: {},
  },
  createdAt: faker.date.past(),
});

/**
 * Curated set of inputs for concise testing.
 *
 * @remarks
 * This collection comprises various input types typically used for error-checking tests. It includes both valid and
 * commonly omitted values, facilitating the testing of error-throwing scenarios.
 */
export const inputs = {
  nonNumeric: ["str", null, [], {}, false, true],
  nonArray: ["str", null, 10, {}, false, true],
  nonObject: ["str", null, 10, [], false, true],
};
