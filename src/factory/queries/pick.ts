import { faker } from "@faker-js/faker";
import deepmerge from "deepmerge";

import { Adaptable, Closure } from "@src/types.js";

export class Pick<T = Record<string, any>> {
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
  private indexes: number[];

  /**
   * Sets up the All instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   */
  public constructor(entries: T[], indexes: number[]) {
    this.entries = entries;
    this.indexes = indexes;
  }

  /**
   * Perform the "get()" action on the "pick()" query.
   *
   * @example
   * factory.get().pick([idx])
   *
   * @returns {Array} The entries at the {indexes}.
   */
  public get(): T[] {
    return this.entries.filter((_, idx) => this.indexes.includes(idx));
  }

  /**
   * Perform the "set()" action on the "pick()" query.
   *
   * @example
   * factory.set(source).pick([idx])
   *
   * @returns {Array} The entries at the {indexes}, after applying updates.
   */
  public set(source: Closure<Adaptable<T>>): T[] {
    return this.indexes.map(idx => {
      return (this.entries[idx] = deepmerge<T>(this.entries[idx], source(faker) as T, { arrayMerge: (_, sourceArray) => sourceArray }));
    });
  }

  /**
   * Perform the "delete()" action on the "pick()" query.
   *
   * @example
   * factory.delete().pick([idx])
   *
   * @returns {Array} The entries at the {indexes} that have been removed.
   */
  public delete(): T[] {
    const removed: T[] = [];
    this.indexes
      .sort((a, b) => b - a)
      .forEach(idx => {
        removed.push(this.entries.splice(idx, 1)[0]);
      });
    return removed.reverse();
  }
}
