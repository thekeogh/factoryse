import { faker } from "@faker-js/faker";
import deepmerge from "deepmerge";

import { Adaptable, Closure } from "@src/types.js";

export class All<T = Record<string, any>> {
  /**
   * Central storage for data, inherited from the main Factory instance.
   *
   * @remarks
   * This property is a direct reflection of the data managed by the main Factory instance, representing the current
   * state of data to be manipulated through actions. It is dynamically updated through actions like add, update, or
   * delete. The get actions refer to this storage for data retrieval, ensuring no mutations to the original data, thus
   * preserving its integrity, even when reordering or structurally altering the data during retrieval.
   */
  private entries: T[];

  /**
   * Sets up the All instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   */
  public constructor(entries: T[]) {
    this.entries = entries;
  }

  /**
   * Perform the "get()" action on the "all()" query.
   *
   * @example
   * factory.get().all()
   *
   * @returns {Array} All entries.
   */
  public get(): T[] {
    return this.entries;
  }

  /**
   * Perform the "set()" action on the "all()" query.
   *
   * @example
   * factory.set(source).all()
   *
   * @returns {Array} All entries, after applying updates.
   */
  public set(source: Closure<Adaptable<T>>): T[] {
    this.entries = this.entries.map(item => {
      return deepmerge<T>(item, source(faker) as T, { arrayMerge: (_, sourceArray) => sourceArray });
    });
    return this.entries;
  }

  /**
   * Perform the "delete()" action on the "all()" query.
   *
   * @example
   * factory.delete().all()
   *
   * @returns {Array} All entries that have been removed.
   */
  public delete(): T[] {
    return this.entries.splice(0);
  }
}
