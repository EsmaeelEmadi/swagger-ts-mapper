export type TProperties = {
    [key: string]: TSchema;
};

export type TFlatten<T> = T extends Record<string, unknown>
    ? { [K in keyof T]: TFlatten<T[K]> }
    : T;

export type TMutable<T> = { -readonly [K in keyof T]: T[K] };

export type TSchema = {
    type?: unknown;
    nullable?: boolean;
    enum?: unknown;
    items?: TProperties | { type: unknown } | readonly TSchema[];
    required?: readonly string[];
    properties?: TProperties;
    additionalProperties?:
        | boolean
        | { type?: "string" | "integer" | "boolean" | "" };
    oneOf?: readonly TSchema[];
    allOf?: readonly TSchema[];
    anyOf?: readonly TSchema[];
};

export type UnionToIntersection<U> = (
    U extends unknown
        ? (k: U) => void
        : "never-1"
) extends (k: infer I) => void
    ? I
    : "never-2";
