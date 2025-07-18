import type { Properties } from "./properties";

export type Schema = {
    type?: unknown;
    format?: unknown;
    nullable?: boolean;
    enum?: unknown;
    items?: Properties | { type: unknown } | readonly Schema[] | Schema;
    required?: readonly string[];
    properties?: Properties;
    additionalProperties?:
        | boolean
        | { type?: "string" | "integer" | "boolean" | "" };
    oneOf?: readonly Schema[];
    allOf?: readonly Schema[];
    anyOf?: readonly Schema[];
    $ref?: string;
    [key: string]: unknown;
};
