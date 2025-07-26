import type { ResponseMapper } from "../src/mappers/reponseMapper";
import type { RequestBodyMapper } from "../src/mappers/requestBodyMapper";
import type { SwaggerMapper } from "../src/mappers/swaggerMapper";
import type { sample } from "./sample";

type RequestBody = SwaggerMapper<
    typeof sample
>["/store/order"]["post"]["requestBody"];

type TestParam = SwaggerMapper<
    typeof sample
>["/pet/findByStatus"]["get"]["parameters"];

type Response = SwaggerMapper<
    typeof sample
>["/store/order"]["post"]["requestBody"];

type Res = ResponseMapper<
    typeof sample,
    (typeof sample)["paths"]["/pet"]["post"]["responses"]
>;

type Req = RequestBodyMapper<
    typeof sample,
    (typeof sample)["paths"]["/pet"]["post"]["requestBody"]
>;
