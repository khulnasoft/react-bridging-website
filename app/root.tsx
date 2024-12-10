import type { LoaderFunctionArgs } from "react-bridging";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-bridging";
import { CACHE_CONTROL, middlewares } from "./http";

import { parseColorScheme } from "./modules/color-scheme/server";
import {
  ColorSchemeScript,
  useColorScheme,
} from "./modules/color-scheme/components";
import { isHost } from "./modules/http-utils/is-host";
import iconsHref from "~/icons.svg";
import { DocSearch } from "./modules/docsearch";

import "~/styles/tailwind.css";
import "@docsearch/css/dist/style.css";
import "~/styles/docsearch.css";
// FIXUP: Styles need to all be imported in root until this is fixed:
// https://github.com/khulnasoft/react-bridging/issues/12382
import "~/styles/docs.css";
import type { Route } from "./+types/root";

export async function loader({ request }: LoaderFunctionArgs) {
  await middlewares(request);

  let colorScheme = await parseColorScheme(request);
  let isProductionHost = isHost("reactbridging.com", request);

  return { colorScheme, isProductionHost };
}

export function headers() {
  return {
    // default all caching to deployments
    "Cache-Control": CACHE_CONTROL.deploy,
    Vary: "Cookie",
  };
}

export function meta({ error }: Route.MetaArgs) {
  return [{ title: error ? "Oops | React Bridging" : "React Bridging" }];
}

export function Layout({ children }: { children: React.ReactNode }) {
  let colorScheme = useColorScheme();

  return (
    <html
      lang="en"
      className={colorScheme === "dark" ? "dark" : ""}
      suppressHydrationWarning
    >
      <head>
        <ColorSchemeScript />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="icon"
          href="/favicon-light.png"
          type="image/png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
        <Meta />
        <Links />
      </head>

      <body className="bg-white text-black antialiased selection:bg-blue-200 selection:text-black dark:bg-gray-900 dark:text-white dark:selection:bg-blue-800 dark:selection:text-white">
        <img
          src={iconsHref}
          alt=""
          hidden
          // this img tag simply forces the icons to be loaded at a higher
          // priority than the scripts (chrome only for now)
          // @ts-expect-error React forces you to set fetchpriority to lowercase
          // eslint-disable-next-line react/no-unknown-property
          fetchpriority="high"
        />
        <DocSearch>{children}</DocSearch>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <div className="font-bold">Oops</div>
      <div>Something went wrong</div>
      <Link to="/" className="mt-8 underline">
        Go Home
      </Link>
    </div>
  );
}
