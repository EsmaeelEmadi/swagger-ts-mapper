import type { Parameter } from "../types/parameter";
import type { Swagger } from "../types/swagger";
import type { MapByIn } from "../utils/mapByIn";
import type { RemoveEmptyObjects } from "../utils/removeEmptyObjects";

export type ParametersMapper<
    S extends Swagger,
    P extends readonly Parameter[],
> = RemoveEmptyObjects<{
    query: MapByIn<S, P, "query">;
    path: MapByIn<S, P, "path">;
    header: MapByIn<S, P, "header">;
    cookie: MapByIn<S, P, "cookie">;
}>;
