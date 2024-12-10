import { redirect } from "react-bridging";
import { getRepoTags } from "~/modules/gh-docs/.server";
import * as semver from "semver";
import type { Route } from "./+types/redirect-v7-doc";

export async function loader({ request }: Route.LoaderArgs) {
  let url = new URL(request.url);
  let [, s, ...rest] = url.pathname.split("/");

  let versions = await getRepoTags();
  let latest = semver.maxSatisfying(versions, `${s}.x`, {
    includePrerelease: false,
  });

  if (latest) {
    return redirect(`/${latest}/${rest.join("/")}${url.search}`);
  }

  return new Response("Not Found", { status: 404 });
}
