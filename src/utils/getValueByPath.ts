export type GetValueByPath<T, P extends string[]> = P extends [
    infer Head,
    ...infer Rest extends string[],
]
    ? Head extends "#"
        ? GetValueByPath<T, Rest>
        : Head extends keyof T
          ? GetValueByPath<T[Head], Rest>
          : never
    : T;
