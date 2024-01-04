import { Adaptable, Closure } from "@types";

import { Queries } from "@factory/queries";

export class Actions<T = Record<string, any>> {
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
   * Sets up the Actions instance with data from the main Factory.
   *
   * @param entries - The dataset provided by the main Factory instance.
   */
  public constructor(entries: T[]) {
    this.entries = entries;
  }

  /**
   * Configures the factory to perform "get" actions.
   *
   * @remarks
   * Invoking this method configures the factory to perform subsequent operations in "get" mode. Operations in this mode
   * are designed to retrieve data without altering the entries array, ensuring the integrity of the original data.
   */
  public get(): Queries<T> {
    return new Queries<T>(this.entries, "get");
  }

  /**
   * Configures the factory to perform "set" actions.
   *
   * @param source - A closure that provides the properties to be applied using Faker.
   *
   * @remarks
   * When this method is invoked, it sets the factory into "set" mode. In this mode, subsequent actions taken on the
   * factory will apply the specified modifications as defined in the source closure.
   */
  public set(source: Closure<Adaptable<T>>): Queries<T> {
    return new Queries<T>(this.entries, "set", source);
  }

  /**
   * Configures the factory to perform "delete" actions.
   *
   * @remarks
   * This method configures the factory to operate in "delete" mode. Following this, any actionable methods invoked on
   * the factory will execute deletion operations.
   */
  public delete(): Queries<T> {
    return new Queries<T>(this.entries, "delete");
  }
}
