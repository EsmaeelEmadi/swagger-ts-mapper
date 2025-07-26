export type RemoveEmptyObjects<T> = {
    [K in keyof T as keyof T[K] extends never ? never : K]: T[K];
};
