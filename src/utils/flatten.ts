export type Flatten<T> = T extends Record<string, unknown>
    ? { [K in keyof T]: Flatten<T[K]> }
    : T;
