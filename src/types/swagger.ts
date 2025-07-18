import type { SwaggPath } from "./swaggerPath";

export interface Swagger {
    paths?: SwaggPath;
    components?: unknown;
    [key: string]: unknown;
}
