import { Action, Adaptable, Closure } from "@src/types.js";

import { ERRORS } from "@core/constants.js";

import { All } from "@factory/queries/all.js";
import { Any } from "@factory/queries/any.js";
import { At } from "@factory/queries/at.js";
import { Between } from "@factory/queries/between.js";
import { By } from "@factory/queries/by.js";
import { First } from "@factory/queries/first.js";
import { Last } from "@factory/queries/last.js";
import { Pick } from "@factory/queries/pick.js";

export class Queries<T> {
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
   * Source data for modification in "set()" actions.
   *
   * @remarks
   * This is the closure provided for "set()" actions, responsible for defining how the entries in the dataset should be
   * modified. It's applied to the data in accordance with the specified query.
   */
  private source: Closure<Adaptable<T>> | undefined;

  /**
   * Specifies the current action to be executed.
   *
   * @remarks
   * Determines the type of operation (get, set, delete) to be performed on the entries. The chosen action dictates how
   * the query processes and manipulates the data.
   */
  private action: Action;

  /**
   * Initialises an instance with data and action parameters from the main Factory.
   *
   * @param entries - Array of data items passed from the main Factory instance.
   * @param action - Specifies the type of operation (get, set, or delete) to be performed on the entries.
   * @param source - Optional source data used exclusively for "set()" action modifications.
   */
  public constructor(entries: T[], action: Action, source?: Closure<Adaptable<T>>) {
    this.entries = entries;
    this.action = action;
    this.source = source;
  }

  /**
   * Executes the "all()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'All' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to all entries in the dataset.
   */
  public all(): T[] {
    const query = new All<T>(this.entries);
    if (["set", "delete"].includes(this.action) && !this.entries.length) {
      throw new Error(ERRORS.ENTRIES_EMPTY);
    }
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }

  /**
   * Executes the "first()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'First' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to first entry(ies) in the dataset.
   */
  public first(count = 1): T[] {
    if (typeof count !== "number" || count < 1) {
      throw new Error(ERRORS.COUNT_INVALID);
    }
    if (count > this.entries.length) {
      throw new Error(ERRORS.COUNT_EXCEEDS_DATA);
    }
    const query = new First<T>(this.entries, count);
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }

  /**
   * Executes the "last()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'Last' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to last entry(ies) in the dataset.
   */
  public last(count = 1): T[] {
    if (typeof count !== "number" || count < 1) {
      throw new Error(ERRORS.COUNT_INVALID);
    }
    if (count > this.entries.length) {
      throw new Error(ERRORS.COUNT_EXCEEDS_DATA);
    }
    const query = new Last<T>(this.entries, count);
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }

  /**
   * Executes the "any()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'Any' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to random entries in the dataset.
   */
  public any(count = 1): T[] {
    if (typeof count !== "number" || count < 1) {
      throw new Error(ERRORS.COUNT_INVALID);
    }
    if (count > this.entries.length) {
      throw new Error(ERRORS.COUNT_EXCEEDS_DATA);
    }
    const query = new Any<T>(this.entries, count);
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }

  /**
   * Executes the "at()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'At' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to the entry at the specified index in the dataset.
   */
  public at(index = 0): T {
    if (typeof index !== "number" || index < 0) {
      throw new Error(ERRORS.INDEX_INVALID);
    }
    if (index + 1 > this.entries.length) {
      throw new Error(ERRORS.INDEX_EXCEEDS_DATA);
    }
    const query = new At<T>(this.entries, index);
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }

  /**
   * Executes the "pick()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'Pick' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to the entries at the specified indexes in the dataset.
   */
  public pick(indexes: number[]): T[] {
    if (!Array.isArray(indexes) || !indexes.length) {
      throw new Error(ERRORS.INDEXES_MISSING);
    }
    for (const index of indexes) {
      if (typeof index !== "number" || index < 0) {
        throw new Error(ERRORS.INDEXES_INVALID);
      }
      if (index + 1 > this.entries.length) {
        throw new Error(ERRORS.INDEX_EXCEEDS_DATA);
      }
    }
    const query = new Pick<T>(this.entries, indexes);
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }

  /**
   * Executes the "between()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'Between' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to the entries between the specified indexes in the dataset.
   */
  public between(start = 0, end = this.entries.length - 1): T[] {
    if (typeof start !== "number" || start < 0) {
      throw new Error(ERRORS.START_INVALID);
    }
    if (typeof end !== "number" || end < 0) {
      throw new Error(ERRORS.END_INVALID);
    }
    if (start + 1 > this.entries.length) {
      throw new Error(ERRORS.START_EXCEEDS_DATA);
    }
    if (end + 1 > this.entries.length) {
      throw new Error(ERRORS.END_EXCEEDS_DATA);
    }
    if (start > end) {
      throw new Error(ERRORS.START_EXCEEDS_END);
    }
    const query = new Between<T>(this.entries, start, end);
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }

  /**
   * Executes the "by()" query according to the specified action.
   *
   * @remarks
   * This method delegates to the 'By' query class, executing the operation (get, set, or delete) defined by the
   * current action setting. The operation is applied to the entries found by the {criteria} in the dataset.
   */
  public by(criteria: Adaptable<T>): T[] {
    if (!criteria || typeof criteria !== "object" || !Object.keys(criteria).length) {
      throw new Error(ERRORS.CRITERIA_MISSING);
    }
    if (!this.entries.length) {
      throw new Error(ERRORS.ENTRIES_EMPTY);
    }
    const query = new By<T>(this.entries, criteria);
    switch (this.action) {
      case "get":
        return query.get();
      case "set":
        if (!this.source) {
          throw new Error(ERRORS.SOURCE_MISSING);
        }
        return query.set(this.source);
      case "delete":
        return query.delete();
      default:
        throw new Error(ERRORS.UNKNOWN_ACTION);
    }
  }
}
