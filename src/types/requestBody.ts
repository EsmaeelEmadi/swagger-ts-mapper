import type { Schema } from "./schema";

export type RequestBody = {
    content?: {
        [key: string]: {
            schema: Schema;
        };
    };
    [key: string]: unknown;
};
