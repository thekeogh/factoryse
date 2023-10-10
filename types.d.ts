declare namespace Factoryse {
  /**
   * Utility type for creating a deep partial representation of the given input type.
   *
   * @template T - The input type for which a deep partial type is needed.
   *
   * @remarks
   * This utility type recursively makes all properties of an object optional, including nested objects.
   */
  type PartialDeep<T> = T extends object ? { [P in keyof T]?: PartialDeep<T[P]> } : T;

  /**
   * Utility type that allows additional keys of any type to be added to an interface or type.
   *
   * @template T - The input type or interface to which additional keys are allowed.
   *
   * @remarks
   * This utility type preserves the existing shape of the input type while allowing the inclusion of extra keys. It is
   * useful for extending interfaces with additional keys.
   */
  type Extendable<T> = T extends object ? { [K in keyof T]: Extendable<T[K]> } & Record<string, any> : T;
}
