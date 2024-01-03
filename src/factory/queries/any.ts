import { faker } from "@faker-js/faker";
import deepmerge from "deepmerge";

import { Adaptable, Closure } from "@src/types.js";

export class Any<T> {
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
   * Specifies the quantity of entries to process randomly from the dataset.
   *
   * @remarks
   * This attribute determines the number of entries to be included in the query, randomly selected. It defines the
   * scope of entries affected by the 'any' method operation.
   */
  private count: number;

  /**
   * Sets up the All instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   * @param count - The number of items randomly from the dataset to be considered in the operation.
   */
  public constructor(entries: T[], count: number) {
    this.entries = entries;
    this.count = count;
  }

  /**
   * Perform the "get()" action on the "any()" query.
   *
   * @example
   * factory.get().any(count)
   *
   * @returns {Array} A random subset of {count} entries.
   */
  public get(): T[] {
    return this.entries
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, this.count);
  }

  /**
   * Perform the "set()" action on the "any()" query.
   *
   * @example
   * factory.set(source).any(count)
   *
   * @returns {Array} A random subset of {count} entries, after applying updates.
   */
  public set(source: Closure<Adaptable<T>>): T[] {
    const indexes = Array.from({ length: this.entries.length }, (_, idx) => idx)
      .sort(() => Math.random() - 0.5)
      .slice(0, this.count);
    return (this.entries = indexes.map(
      idx => (this.entries[idx] = deepmerge<T>(this.entries[idx], source(faker) as T, { arrayMerge: (_, sourceArray) => sourceArray }))
    ));
  }

  /**
   * Perform the "delete()" action on the "any()" query.
   *
   * @example
   * factory.delete().any(count)
   *
   * @returns {Array} The random subset of {count} entries that have been removed.
   */
  public delete(): T[] {
    const indexes = Array.from({ length: this.entries.length }, (_, idx) => idx)
      .sort(() => Math.random() - 0.5)
      .slice(0, this.count);
    const removed: T[] = [];
    for (const idx of indexes.sort((a, b) => b - a)) {
      removed.push(...this.entries.splice(idx, 1));
    }
    return removed;
  }
}
