import { faker } from "@faker-js/faker";
import deepmerge from "deepmerge";

import { Adaptable, Closure } from "@src/types.js";

export class At<T> {
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
  private index: number;

  /**
   * Sets up the All instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   */
  public constructor(entries: T[], index: number) {
    this.entries = entries;
    this.index = index;
  }

  /**
   * Perform the "get()" action on the "at()" query.
   *
   * @example
   * factory.get().at(index)
   *
   * @returns {T} The entry at {index}.
   */
  public get(): T {
    return this.entries[this.index];
  }

  /**
   * Perform the "set()" action on the "at()" query.
   *
   * @example
   * factory.set(source).at(index)
   *
   * @returns {T} The entry at {index}, after applying updates.
   */
  public set(source: Closure<Adaptable<T>>): T {
    return (this.entries[this.index] = deepmerge<T>(this.entries[this.index], source(faker) as T, { arrayMerge: (_, sourceArray) => sourceArray }));
  }

  /**
   * Perform the "delete()" action on the "at()" query.
   *
   * @example
   * factory.delete().at(index)
   *
   * @returns {T} The entry at {index} that has been removed.
   */
  public delete(): T {
    return this.entries.splice(this.index, 1)[0];
  }
}
