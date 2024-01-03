import { Faker } from "@faker-js/faker";
import { PartialDeep } from "type-fest";

/*
 * ------------------------------------------------------------------------------------------------
 * Utility Types
 * ------------------------------------------------------------------------------------------------
 * The utility types provided below serve as versatile tools applicable throughout Factoryse.
 * These types are designed to enhance functionality and flexibility within various aspects of the
 * package. While integral to Factoryse, their universal design allows for potential application
 * beyond the scope of this package.
 * ------------------------------------------------------------------------------------------------
 */

/**
 * A versatile utility type for augmenting interfaces or types with additional keys.
 *
 * @remarks
 * Retains the original structure of the provided type but enables the addition of new keys of any type. This feature is
 * particularly handy for expanding interfaces or types with extra properties.
 */
export type Adaptable<T> = PartialDeep<T extends object ? { [K in keyof T]: Adaptable<T[K]> } & Record<string, any> : T>;

/*
 * ------------------------------------------------------------------------------------------------
 * Factoryse Types
 * ------------------------------------------------------------------------------------------------
 * The types presented below are uniquely crafted for use within the Factoryse package. They are
 * integral to the inner workings of Factoryse, offering tailored functionalities specific to its
 * needs. By centralising them here, we ensure that the core files remain uncluttered, keeping
 * interfaces and types organised and easily manageable.
 * ------------------------------------------------------------------------------------------------
 */

/**
 * Type definition for a constructor-like functionality.
 *
 * @remarks
 * This type facilitates access to the Faker instance, enabling its use in creating instances of the Factory class and
 * in handling the editable source closure.
 */
export type Closure<T> = (faker: Faker) => T;

/**
 * Specifies allowable actions for the Factory class.
 *
 * @remarks
 * This type is used by the Factory class to perform both manipulation and querying of entries. The specific action
 * selected influences the behavior of the resulting query method.
 */
export type Action = "get" | "set" | "delete";

/**
 * Define all the query methods available in the Factory class.
 *
 * @remarks
 * Each action method in Factoryse leverages one of these queries to perform the intended action. These are the
 * supported query actions in Factoryse.
 */
export type Query = "all" | "first" | "last" | "any" | "at" | "pick" | "between" | "by";
