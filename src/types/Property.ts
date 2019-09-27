export interface Property<Return, Value> {
  /**
   * Set the value of the property
   * @param value The value to set
   */
  set(value: Value): Return;

  /** Completely removes the property from the object so it won't be present on the built object */
  unset(): Return;
}
