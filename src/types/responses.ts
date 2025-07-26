import type { HttpStatusCode } from "./httpStatusCode";
import type { ResponseBody } from "./responseBody";

export type Responses = Partial<Record<HttpStatusCode, ResponseBody>>;
