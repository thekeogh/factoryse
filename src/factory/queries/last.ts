import { faker } from "@faker-js/faker";
import deepmerge from "deepmerge";

import { Adaptable, Closure } from "@src/types.js";

export class Last<T> {
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
   * Specifies the quantity of entries to process from the end of the dataset.
   *
   * @remarks
   * This attribute determines the number of entries to be included in the query, starting from the last entry and
   * moving backwards. It defines the scope of entries affected by the 'last' method operation.
   */
  private count: number;

  /**
   * Sets up the All instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   * @param count - The number of items from the end of the dataset to be considered in the operation.
   */
  public constructor(entries: T[], count: number) {
    this.entries = entries;
    this.count = count;
  }

  /**
   * Perform the "get()" action on the "last()" query.
   *
   * @example
   * factory.get().last(count)
   *
   * @returns {Array} The last {count} entries.
   */
  public get(): T[] {
    return this.entries.slice(-this.count);
  }

  /**
   * Perform the "set()" action on the "last()" query.
   *
   * @example
   * factory.set(source).last(count)
   *
   * @returns {Array} The last {count} entries, after applying updates.
   */
  public set(source: Closure<Adaptable<T>>): T[] {
    this.entries = this.entries
      .reverse()
      .map((entry, idx) => (idx <= this.count - 1 ? deepmerge<T>(entry, source(faker) as T) : entry))
      .reverse();
    return this.entries.slice(-this.count);
  }

  /**
   * Perform the "delete()" action on the "last()" query.
   *
   * @example
   * factory.delete().last(count)
   *
   * @returns {Array} The last {count} entries that have been removed.
   */
  public delete(): T[] {
    return this.entries.splice(-this.count, this.count);
  }
}
