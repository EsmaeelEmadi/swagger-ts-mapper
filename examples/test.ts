import type { SwaggerMapper } from "../src/mappers/swaggerMapper";
import type { sample } from "./sample";

type Test = SwaggerMapper<typeof sample>;
