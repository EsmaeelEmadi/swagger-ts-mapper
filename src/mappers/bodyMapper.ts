import type { Properties } from "../types/properties";
import type { Schema } from "../types/schema";
import type { Swagger } from "../types/swagger";
import type { Flatten } from "../utils/flatten";
import type { Mutable } from "../utils/mutable";
import type { ResolveRef } from "../utils/resolveRef";
import type { UnionToIntersection } from "../utils/unionToIntersection";

export type BodyMapper<
    S extends Swagger,
    T extends Schema | readonly Schema[],
> = T extends readonly Schema[]
    ? BodyMapper<S, T[number]> // Handle array of schemas (for oneOf, etc.)
    : T extends Schema
      ? // 1. Handle $ref first, as it's a pointer to a different schema
        "$ref" extends keyof T
          ? T["$ref"] extends string
              ? ResolveRef<S, T["$ref"]> extends infer P
                  ? P extends Schema
                      ? BodyMapper<S, P>
                      : never
                  : never
              : never
          : // 2. Handle combiners like `allOf` and `oneOf`
            "allOf" extends keyof T
            ? T["allOf"] extends readonly Schema[]
                ? UnionToIntersection<BodyMapper<S, T["allOf"][number]>>
                : never
            : "oneOf" extends keyof T
              ? T["oneOf"] extends readonly Schema[]
                  ? BodyMapper<S, T["oneOf"]>
                  : never
              : "anyOf" extends keyof T
                ? T["anyOf"] extends readonly Schema[]
                    ? BodyMapper<S, T["anyOf"]>
                    : never
                : // 3. Handle by `type` property after resolving structures
                  T["type"] extends "object"
                  ? Flatten<
                        T["properties"] extends Properties
                            ? {
                                  // Required properties
                                  [K in keyof Mutable<
                                      T["properties"]
                                  > as T extends {
                                      required: readonly string[];
                                  }
                                      ? K extends T["required"][number]
                                          ? K
                                          : never
                                      : never]-?:
                                      | BodyMapper<
                                            S,
                                            Mutable<T["properties"]>[K]
                                        >
                                      | (Mutable<T["properties"]>[K] extends {
                                            nullable: true;
                                        }
                                            ? null
                                            : never);
                              } & {
                                  // Optional properties
                                  [K in keyof Mutable<
                                      T["properties"]
                                  > as T extends {
                                      required: readonly string[];
                                  }
                                      ? K extends T["required"][number]
                                          ? never
                                          : K
                                      : K]?:
                                      | BodyMapper<
                                            S,
                                            Mutable<T["properties"]>[K]
                                        >
                                      | (T["properties"][K] extends {
                                            nullable: true;
                                        }
                                            ? null
                                            : never);
                              } & (T["additionalProperties"] extends true
                                      ? { [key: string]: unknown }
                                      : T["additionalProperties"] extends Schema
                                        ? {
                                              [key: string]: BodyMapper<
                                                  S,
                                                  T["additionalProperties"]
                                              >;
                                          }
                                        : // biome-ignore lint/complexity/noBannedTypes: <explanation>
                                          {})
                            : Record<string, unknown>
                    >
                  : T["type"] extends "array"
                    ? "items" extends keyof T
                        ? T["items"] extends Schema
                            ? BodyMapper<S, T["items"]>[]
                            : never
                        : never
                    : T["type"] extends "string"
                      ? // ✅ Check for `format` INSIDE the string type handler
                        "format" extends keyof T
                          ? T["format"] extends "binary" | "byte"
                              ? File
                              : string // It's a string with a different format, so default to string
                          : "enum" extends keyof T
                            ? T["enum"] extends readonly string[]
                                ? T["enum"][number]
                                : never
                            : string
                      : // ✅ Correctly handles number/integer regardless of other properties
                        T["type"] extends "number" | "integer"
                        ? "enum" extends keyof T
                            ? T["enum"] extends readonly number[]
                                ? T["enum"][number]
                                : never
                            : number
                        : T["type"] extends "boolean"
                          ? boolean
                          : T["type"] extends "null"
                            ? null
                            : unknown
      : unknown;
