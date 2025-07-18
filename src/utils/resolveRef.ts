import type { GetValueByPath } from "./getValueByPath";
import type { Split } from "./split";

export type ResolveRef<Doc, Ref extends string> = Ref extends string
    ? GetValueByPath<Doc, Split<Ref, "/">>
    : never;
