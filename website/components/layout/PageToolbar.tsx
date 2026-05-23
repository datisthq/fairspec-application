import { useLingui } from "@lingui/react/macro"
import * as icons from "#icons.ts"

export function PageToolbar() {
  const { t } = useLingui()

  const handleOpenIn = (url: string) => {
    navigator.clipboard.writeText(window.location.href)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const buttonClass =
    "flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"

  return (
    <div className="mb-6 flex flex-col gap-2 text-sm">
      <p className="text-sm font-medium mb-1">{t`Actions`}</p>
      <button
        type="button"
        onClick={() => handleOpenIn("https://chatgpt.com/")}
        className={buttonClass}
      >
        <icons.ExternalLink className="size-3.5" />
        {t`Open in ChatGPT`}
      </button>
      <button
        type="button"
        onClick={() => handleOpenIn("https://claude.ai/")}
        className={buttonClass}
      >
        <icons.ExternalLink className="size-3.5" />
        {t`Open in Claude`}
      </button>
    </div>
  )
}
