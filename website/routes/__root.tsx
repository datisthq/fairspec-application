import { i18n } from "@lingui/core"
import { I18nProvider } from "@lingui/react"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools"
import {
  createRootRoute,
  HeadContent,
  notFound,
  Outlet,
  Scripts,
  useParams,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import type * as React from "react"
import { Layout } from "#components/layout/Layout.tsx"
import { DefaultCatchBoundary } from "#components/system/DefaultCatchBoundary.tsx"
import { NotFound } from "#components/system/NotFound.tsx"
import { LanguageIdDefault, Languages } from "#constants/language.ts"
import { Toaster } from "#elements/sonner.tsx"
import * as settings from "#settings.ts"
import generalCss from "#styles/general.css?url"

export const Route = createRootRoute({
  head: ({ matches }) => {
    const match = matches.at(-1)
    const path = match?.fullPath
    const params = match?.params as any

    const language = Object.values(Languages).find(
      language => language.slug === params?.languageSlug,
    )

    // TODO: should be a builtin function in the future
    // https://github.com/TanStack/router/discussions/6551
    const makeLink = (languageSlug?: string) => {
      const replacement = languageSlug ? `/${languageSlug}` : ""
      const compiledPath = path?.replace("/{-$languageSlug}", replacement)
      const trailingPath = compiledPath?.endsWith("/")
        ? compiledPath
        : `${compiledPath}/`
      return `${settings.HOST}${trailingPath}`
    }

    return {
      meta: [
        // General
        { title: settings.TITLE },
        { name: "description", content: settings.DESCRIPTION },
        // Open Graph
        { property: "og:title", content: settings.TITLE },
        { property: "og:description", content: settings.DESCRIPTION },
        { property: "og:url", content: makeLink(language?.slug) },
        { property: "og:site_name", content: settings.TITLE },
        { property: "og:image", content: settings.IMAGE },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: language?.id },
        // Media
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      links: [
        { rel: "stylesheet", href: generalCss },
        {
          rel: "icon",
          type: "image/png",
          href: "/logo.png",
        },
        {
          rel: "canonical",
          href: makeLink(language?.slug),
        },
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: makeLink(),
        },
        ...Object.values(Languages).map(language => ({
          rel: "alternate",
          hrefLang: language.id,
          href: makeLink(language.slug),
        })),
      ],
      scripts: [
        {
          src: "https://plausible.io/js/script.js",
          "data-domain": "fairspec.org",
          defer: true,
        },
      ],
    }
  },
  // TODO: improve NotFound page in this case
  // @ts-expect-error
  beforeLoad: ({ params }) => {
    if ("languageSlug" in params) {
      const language = Object.values(Languages).find(
        language => language.slug === params.languageSlug,
      )

      if (!language) {
        throw notFound()
      }
    }
  },
  // TODO: improve NotFound page
  notFoundComponent: () => <NotFound />,
  errorComponent: props => {
    return (
      <Document>
        <DefaultCatchBoundary {...props} />
      </Document>
    )
  },
  component: () => {
    return (
      <Document>
        <Outlet />
      </Document>
    )
  },
})

function Document(props: { children: React.ReactNode }) {
  const { languageSlug } = useParams({ strict: false })

  return (
    <I18nProvider i18n={i18n}>
      <html lang={languageSlug ?? LanguageIdDefault} suppressHydrationWarning>
        <head>
          <HeadContent />
        </head>
        <body>
          <Layout>{props.children}</Layout>
          <Toaster position="top-center" />
          <TanStackDevtools
            config={{ hideUntilHover: true }}
            plugins={[
              {
                name: "TanStack Query",
                render: <ReactQueryDevtoolsPanel />,
                defaultOpen: true,
              },
              {
                name: "TanStack Router",
                render: <TanStackRouterDevtoolsPanel />,
                defaultOpen: false,
              },
            ]}
          />
          <Scripts />
        </body>
      </html>
    </I18nProvider>
  )
}
