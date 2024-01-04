import { faker } from "@faker-js/faker";

import { Closure } from "@types";

import { ERRORS } from "@core/constants";

import { Actions } from "@factory/actions";

export class Factory<T = Record<string, any>> {
  /**
   * The primary storage for factory-generated data.
   *
   * @remarks
   * This property serves as the central repository for all data created by the factory. It is dynamically modified by
   * various methods to add, update, or remove items. Data retrieval methods (get queries) access this property to fetch
   * and return the required information to the user. Importantly, these retrieval operations do not mutate the stored
   * data, ensuring that the original data remains unchanged even if the order or structure of the returned data
   * differs.
   */
  private entries: T[];

  /**
   * Initial closure for generating data using Faker.
   *
   * @remarks
   * Stores the initial closure provided for data generation, which remains uninvoked. This allows for its repeated use
   * in different methods, ensuring each data entry is generated with fresh, unique data.
   */
  private base: Closure<T>;

  /**
   * Initialises the Factory with the default data payload.
   *
   * @param base - The Faker closure responsible for generating the initial data.
   */
  public constructor(base: Closure<T>) {
    this.entries = [];
    this.base = base;
  }

  /**
   * Produces a specified number of entry items.
   *
   * @param count - Specifies the quantity of entries to be generated, with a default value of 1.
   *
   * @remarks
   * Utilises the provided generator to append new entries to the current data collection. If a fresh data set is
   * required, existing entries should be explicitly removed via the delete() action prior to invoking this method.
   */
  public make(count = 1): Actions<T> {
    if (typeof count !== "number" || count < 1) {
      throw new Error(ERRORS.COUNT_INVALID);
    }
    for (let i = 1; i <= count; i++) {
      this.entries.push(this.base(faker));
    }
    return new Actions<T>(this.entries);
  }
}
