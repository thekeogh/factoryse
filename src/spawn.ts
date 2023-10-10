import { Faker, faker } from "@faker-js/faker";

import { Factory } from "@src/Factory";

/**
 * Generate an array of Factory instances.
 *
 * @param count - The number of Factory instances to create.
 * @param data - A callback function that generates the schema using Faker.
 *
 * @remarks
 * This function takes a callback function that uses Faker to create a schema. It returns an array of Factory instances.
 */
export function spawn<T extends object = Record<string, any>>(count: number, data: (faker: Faker) => T): Factory[] {
  return Array.from({ length: count }, () => new Factory<T>(data(faker)));
}
