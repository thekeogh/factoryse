/**
 * Export a collection of error messages.
 *
 * @remarks
 * We provide error messages as constants to ensure consistency across the codebase and facilitate easy updates. This
 * approach avoids duplicating messages and allows tests to utilise them without redundancy.
 */
export const ERRORS = {
  SOURCE_MISSING: "Unable to set the entry record(s) as the source closure is undefined. Please provide the faker closure using set(faker => {...}).",
  ENTRIES_EMPTY: "Cannot execute this action since there are no existing entries. Please use the 'make(n)' method to generate entries first.",
  UNKNOWN_ACTION: "Action must be set before calling this method (e.g. get(), set(), or delete()).",
  COUNT_INVALID: "The count argument must be a valid positive number.",
  COUNT_EXCEEDS_DATA: "The count argument should not exceed the total number of the entry record(s).",
  INDEX_INVALID: "The index argument must be a valid number 0 or above.",
  INDEXES_MISSING: "Indexes argument is required and must be an array with at least one element.",
  INDEXES_INVALID: "The indexes argument must contain only valid numbers that are 0 or greater.",
  INDEX_EXCEEDS_DATA: "The index argument must not exceed the maximum index of the entries array.",
  START_INVALID: "The start argument must be a valid number 0 or above.",
  START_EXCEEDS_DATA: "The start argument must not exceed the maximum index of the entries array.",
  START_EXCEEDS_END: "The start argument cannot be be higher than the end argument.",
  END_INVALID: "The end argument must be a valid number 0 or above.",
  END_EXCEEDS_DATA: "The end argument must not exceed the maximum index of the entries array.",
  CRITERIA_MISSING: "The criteria argument is mandatory and must be a valid object.",
};
