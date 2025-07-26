import type { Schema } from "./schema";

export type SwaggPath = Record<
    string,
    Record<
        string,
        {
            responses: Record<
                string,
                {
                    content: Record<string, { schema: Schema }>;
                    [key: string]: unknown;
                }
            >;
            [key: string]: unknown;
        }
    >
>;
