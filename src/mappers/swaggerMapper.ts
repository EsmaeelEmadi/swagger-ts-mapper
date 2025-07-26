import type { HttpMethod } from "../types/httpMethod";
import type { Parameter } from "../types/parameter";
import type { RequestBody } from "../types/requestBody";
import type { Responses } from "../types/responses";
import type { Swagger } from "../types/swagger";
import type { ParametersMapper } from "./parametersMapper";
import type { ResponseMapper } from "./reponseMapper";
import type { RequestBodyMapper } from "./requestBodyMapper";

export type SwaggerMapper<T extends Swagger> = {
    [Path in keyof T["paths"]]: {
        [Method in keyof T["paths"][Path] &
            HttpMethod]: T["paths"][Path][Method] extends {
            responses?: infer R;
            requestBody?: infer RB;
            parameters?: infer P;
        }
            ? {
                  responses: R extends Responses ? ResponseMapper<T, R> : never;
                  requestBody: RB extends RequestBody
                      ? RequestBodyMapper<T, RB>
                      : never;
                  parameters: P extends readonly Parameter[]
                      ? ParametersMapper<T, P>
                      : never;
              }
            : never;
    };
};
