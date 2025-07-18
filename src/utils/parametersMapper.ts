import type { Swagger } from "../types/swagger";
import type { MapByIn } from "./mapByIn";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ParametersMapper<S extends Swagger, P extends any[]> = {
    query: MapByIn<S, P, "query">;
    path: MapByIn<S, P, "path">;
    header: MapByIn<S, P, "header">;
    cookie: MapByIn<S, P, "cookie">;
};
