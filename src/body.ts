type TProperties = {
    [key: string]: TSchema;
};

type TFlatten<T> = T extends Record<string, unknown>
    ? { [K in keyof T]: TFlatten<T[K]> }
    : T;

type TMutable<T> = { -readonly [K in keyof T]: T[K] };

type TSchema = {
    type?: unknown;
    nullable?: boolean;
    enum?: unknown;
    items?: TProperties | { type: unknown };
    required?: readonly string[];
    properties?: TProperties;
    additionalProperties?:
        | boolean
        | { type?: "string" | "integer" | "boolean" | "" };
    oneOf?: readonly TSchema[];
    allOf?: readonly TSchema[];
    anyOf?: readonly TSchema[];
};

type UnionToIntersection<U> = (
    U extends unknown
        ? (k: U) => void
        : "never-1"
) extends (k: infer I) => void
    ? I
    : "never-2";

export type TBodyMapper<T extends TSchema | readonly TSchema[]> =
    T extends TSchema
        ? T["type"] extends "object"
            ? TFlatten<
                  T["properties"] extends TProperties
                      ? {
                            // Required properties
                            [K in keyof TMutable<T["properties"]> as T extends {
                                required: readonly string[];
                            }
                                ? K extends T["required"][number]
                                    ? K
                                    : never
                                : never]-?:
                                | TBodyMapper<TMutable<T["properties"]>[K]>
                                | (TMutable<T["properties"]>[K] extends {
                                      nullable: true;
                                  }
                                      ? null
                                      : never);
                        } & {
                            // Optional properties
                            [K in keyof TMutable<T["properties"]> as T extends {
                                required: readonly string[];
                            }
                                ? K extends T["required"][number]
                                    ? never
                                    : K
                                : K]?:
                                | TBodyMapper<TMutable<T["properties"]>[K]>
                                | (T["properties"][K] extends { nullable: true }
                                      ? null
                                      : never);
                        } & (T["additionalProperties"] extends true
                                ? { [key: string]: unknown }
                                : T["additionalProperties"] extends TSchema
                                  ? {
                                        [key: string]: TBodyMapper<
                                            T["additionalProperties"]
                                        >;
                                    }
                                  : // biome-ignore lint/complexity/noBannedTypes: FIXME: find better type to replace
                                    {})
                      : Record<string, unknown>
              >
            : T["type"] extends "string"
              ? "enum" extends keyof T
                  ? T["enum"] extends readonly string[]
                      ? T["enum"][number]
                      : never
                  : string
              : T["type"] extends "number" | "integer"
                ? "enum" extends keyof T
                    ? T["enum"] extends readonly number[]
                        ? T["enum"][number]
                        : never
                    : number
                : T["type"] extends "boolean"
                  ? boolean
                  : T["type"] extends "array"
                    ? "items" extends keyof T
                        ? T["items"] extends { type: unknown }
                            ? TBodyMapper<T["items"]>[]
                            : never
                        : never
                    : T["type"] extends "null"
                      ? null
                      : "oneOf" extends keyof T
                        ? T["oneOf"] extends readonly TSchema[]
                            ? TBodyMapper<T["oneOf"]>
                            : never
                        : "allOf" extends keyof T
                          ? T["allOf"] extends readonly TSchema[]
                              ? UnionToIntersection<
                                    TBodyMapper<T["allOf"][number]>
                                >
                              : never
                          : "anyOf" extends keyof T
                            ? T["anyOf"] extends readonly TSchema[]
                                ? TBodyMapper<T["anyOf"]>
                                : never
                            : unknown
        : T extends readonly TSchema[]
          ? TBodyMapper<T[number]>
          : unknown;
