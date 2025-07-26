import type { RequestBody } from "../types/requestBody";
import type { Schema } from "../types/schema";
import type { Swagger } from "../types/swagger";
import type { Flatten } from "../utils/flatten";
import type { BodyMapper } from "./bodyMapper";

export type RequestBodyMapper<
    T extends Swagger,
    RB extends RequestBody,
> = Flatten<{
    [ContentType in keyof RB["content"]]: "schema" extends keyof RB["content"][ContentType]
        ? RB["content"][ContentType]["schema"] extends infer S
            ? S extends Schema
                ? BodyMapper<T, S>
                : never
            : never
        : never;
}>;
