import { faker } from "@faker-js/faker";
import deepmerge from "deepmerge";

import { Adaptable, Closure } from "@src/types.js";

export class Between<T> {
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
  private start: number;
  private end: number;

  /**
   * Sets up the All instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   */
  public constructor(entries: T[], start: number, end: number) {
    this.entries = entries;
    this.start = start;
    this.end = end;
  }

  /**
   * Perform the "get()" action on the "between()" query.
   *
   * @example
   * factory.get().between(start, end)
   *
   * @returns {Array} The entries between the {start} and {end} indexes.
   */
  public get(): T[] {
    return this.entries.slice(this.start, this.end + 1);
  }

  /**
   * Perform the "set()" action on the "between()" query.
   *
   * @example
   * factory.set(source).between(start, end)
   *
   * @returns The entries between the {start} and {end} indexes, after applying updates.
   */
  public set(source: Closure<Adaptable<T>>): T[] {
    this.entries.forEach((entry, idx) => {
      if (idx >= this.start && idx <= this.end) {
        this.entries[idx] = deepmerge<T>(entry, source(faker) as T, { arrayMerge: (_, sourceArray) => sourceArray });
      }
    });
    return this.get();
  }

  /**
   * Perform the "delete()" action on the "between()" query.
   *
   * @example
   * factory.delete().between(start, end)
   *
   * @returns The entries between the {start} and {end} indexes that have been removed.
   */
  public delete(): T[] {
    const count = this.end + 1 - this.start;
    return this.entries.splice(this.start, count);
  }
}
