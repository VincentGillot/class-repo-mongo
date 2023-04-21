export type NestedKeyOf<T> = {
  [Key in keyof Required<T> & (string | number)]: NonNullable<
    T[Key]
  > extends Array<any>
    ? NonNullable<NonNullable<T[Key]>[0]> extends object
      ? `${Key}` | `${Key}.${NestedKeyOf<NonNullable<NonNullable<T[Key]>[0]>>}`
      : `${Key}`
    : NonNullable<T[Key]> extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<NonNullable<T[Key]>>}`
    : `${Key}`;
}[keyof T & (string | number)];
