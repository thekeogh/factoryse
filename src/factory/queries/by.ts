import { faker } from "@faker-js/faker";
import deepmerge from "deepmerge";
import filter from "lodash.filter";
import forEach from "lodash.foreach";
import isMatch from "lodash.ismatch";
import remove from "lodash.remove";

import { Adaptable, Closure } from "@types";

export class By<T = Record<string, any>> {
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
  private criteria: Adaptable<T>;

  /**
   * Sets up the All instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   */
  public constructor(entries: T[], criteria: Adaptable<T>) {
    this.entries = entries;
    this.criteria = criteria;
  }

  /**
   * Perform the "get()" action on the "by()" query.
   *
   * @example
   * factory.get().by(criteria)
   *
   * @remarks
   * The criteria object is explicitly cast to a basic object type to accommodate Lodash's requirements. This casting is
   * necessary due to the adaptable nature of the criteria type, which may otherwise lead to compatibility issues with
   * Lodash. However, this type casting is safe given the known validity of the criteria.
   *
   * @returns {Array} The entries found by the {criteria}.
   */
  public get(): T[] {
    return filter<T>(this.entries, this.criteria as Record<string, any>);
  }

  /**
   * Perform the "set()" action on the "by()" query.
   *
   * @example
   * factory.set(source).by(criteria)
   *
   * @returns The entries found by the {criteria}, after applying updates.
   */
  public set(source: Closure<Adaptable<T>>): T[] {
    const result: T[] = [];
    forEach<T>(this.entries, (entry, idx) => {
      if (isMatch(entry as object, this.criteria as Record<string, any>)) {
        this.entries[idx] = deepmerge<T>(entry, source(faker) as T, { arrayMerge: (_, sourceArray) => sourceArray });
        result.push({ ...this.entries[idx] });
      }
    });
    return result;
  }

  // deepmerge<T>(entry, source(faker) as T, { arrayMerge: (_, sourceArray) => sourceArray })

  /**
   * Perform the "delete()" action on the "by()" query.
   *
   * @example
   * factory.delete().by(criteria)
   *
   * @returns The entries found by the {criteria} that have been removed.
   */
  public delete(): T[] {
    return remove<T>(this.entries, this.criteria as Record<string, any>);
  }
}
