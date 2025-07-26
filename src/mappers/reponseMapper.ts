import type { Responses } from "../types/responses";
import type { Schema } from "../types/schema";
import type { Swagger } from "../types/swagger";
import type { Flatten } from "../utils/flatten";
import type { BodyMapper } from "./bodyMapper";

export type ResponseMapper<T extends Swagger, R extends Responses> = Flatten<{
    [StatusCode in keyof R]: R[StatusCode] extends {
        content: infer C;
    }
        ? {
              [ContentType in keyof C]: C[ContentType] extends {
                  schema: infer S;
              }
                  ? S extends Schema
                      ? BodyMapper<T, S>
                      : never
                  : never;
          }
        : unknown;
}>;
