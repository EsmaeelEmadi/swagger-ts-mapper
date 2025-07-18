import type { HttpMethod } from "../types/httpMethod";
import type { Schema } from "../types/schema";
import type { Swagger } from "../types/swagger";
import type { ParametersMapper } from "../utils/parametersMapper";
import type { BodyMapper } from "./bodyMapper";

export type SwaggerMapper<T extends Swagger> = {
    [Path in keyof T["paths"]]: {
        [Method in keyof T["paths"][Path] &
            HttpMethod]: T["paths"][Path][Method] extends {
            responses?: infer R;
            requestBody?: infer RB;
            parameters?: infer P;
        }
            ? {
                  responses: {
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
                  };

                  requestBody: "content" extends keyof RB
                      ? {
                            [ContentType in keyof RB["content"]]: "schema" extends keyof RB["content"][ContentType]
                                ? RB["content"][ContentType]["schema"] extends infer S
                                    ? S extends Schema
                                        ? BodyMapper<T, S>
                                        : never
                                    : never
                                : never;
                        }
                      : never;

                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  parameters: P extends any[] ? ParametersMapper<T, P> : never;
              }
            : never;
    };
};
