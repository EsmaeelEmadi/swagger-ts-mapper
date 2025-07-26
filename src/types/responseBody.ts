import type { Schema } from "./schema";

export type ResponseBody = {
    content?: {
        [key: string]: {
            schema: Schema;
        };
    };
    [key: string]: unknown;
};
