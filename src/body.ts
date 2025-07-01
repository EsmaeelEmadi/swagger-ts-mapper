import type {
    TFlatten,
    TMutable,
    TProperties,
    TSchema,
    UnionToIntersection,
} from "./types.ts";

export type TBodyMapper<T extends TSchema | readonly TSchema[]> =
    T extends TSchema
        ? "format" extends keyof T
            ? T["format"] extends "binary"
                ? File
                : never
            : T["type"] extends "object"
              ? TFlatten<
                    T["properties"] extends TProperties
                        ? {
                              // Required properties
                              [K in keyof TMutable<
                                  T["properties"]
                              > as T extends {
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
                              [K in keyof TMutable<
                                  T["properties"]
                              > as T extends {
                                  required: readonly string[];
                              }
                                  ? K extends T["required"][number]
                                      ? never
                                      : K
                                  : K]?:
                                  | TBodyMapper<TMutable<T["properties"]>[K]>
                                  | (T["properties"][K] extends {
                                        nullable: true;
                                    }
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
                              : T["items"] extends readonly TSchema[]
                                ? [TBodyMapper<T["items"][number]>]
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
