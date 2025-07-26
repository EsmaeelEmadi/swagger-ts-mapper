import type { BodyMapper } from "../mappers/bodyMapper";
import type { Parameter } from "../types/parameter";
import type { Swagger } from "../types/swagger";
import type { Flatten } from "./flatten";

export type MapByIn<
    S extends Swagger,
    P extends readonly Parameter[],
    InValue extends string,
> = Flatten<
    {
        [Param in P[number] as Param extends { in: InValue; required: true }
            ? Param["name"]
            : never]: BodyMapper<S, Param["schema"]>;
    } & {
        [Param in P[number] as Param extends {
            in: InValue;
            required?: false | undefined;
        }
            ? Param["name"]
            : never]?: BodyMapper<S, Param["schema"]>;
    }
>;
