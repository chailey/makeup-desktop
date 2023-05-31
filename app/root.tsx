import { MantineProvider, createEmotionCache } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { HeaderResponsive } from "~/components/Header";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

createEmotionCache({ key: "mantine" });

export default function App() {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <html lang="en">
        <head>
          <StylesPlaceholder />
          <Meta />
          <Links />
        </head>

        <HeaderResponsive
          links={[
            { link: "/", label: "Home" },
            { link: "/about", label: "Learn More" },
            { link: "/app", label: "App" },
          ]}
        />
        <body>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </MantineProvider>
  );
}
