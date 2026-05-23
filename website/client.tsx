import * as plausible from "@plausible-analytics/tracker"
import { StartClient } from "@tanstack/react-start/client"
import { StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"
import { activateLocale, detectClientLanguage } from "#helpers/locale.ts"
import { activateTheme, detectClientTheme } from "#helpers/theme.ts"

if (location.hostname !== "localhost") {
  plausible.init({
    domain: "fairspec.org",
    outboundLinks: true,
  })
}

const language = await detectClientLanguage()
await activateLocale(language.id)

const theme = await detectClientTheme()
activateTheme(theme)

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
