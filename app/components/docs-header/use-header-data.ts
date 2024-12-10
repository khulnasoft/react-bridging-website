import { useLoaderData } from "react-bridging";
import type { HeaderData } from "./data.server";
import invariant from "tiny-invariant";

export function useHeaderData() {
  let data = useLoaderData() as { header: HeaderData };
  invariant(data && data.header, "Expected `header` in loader data");
  return data.header;
}
