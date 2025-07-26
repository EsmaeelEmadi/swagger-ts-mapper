import type { Schema } from "./schema";

export type Parameter = {
    name: string;
    in: "query" | "path" | "header" | "cookie";
    description?: string;
    required?: boolean;
    explode?: boolean;
    schema: Schema;
    [key: string]: unknown;
};
