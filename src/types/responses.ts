import type { HttpStatusCode } from "./httpStatusCode";
import type { ResponseBody } from "./responseBody";

export type Responses = Record<HttpStatusCode, ResponseBody>;
