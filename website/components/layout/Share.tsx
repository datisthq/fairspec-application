import { useLingui } from "@lingui/react/macro"
import { useLocation } from "@tanstack/react-router"
import * as share from "react-share"
import { Button } from "#elements/button.tsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#elements/dropdown-menu.tsx"
import * as icons from "#icons.ts"
import * as settings from "#settings.ts"

export function Share() {
  const { t } = useLingui()

  const location = useLocation()
  const currentUrl = `${settings.HOST}${location.href}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            title={t`Share Page`}
            className="w-full h-auto rounded-xl cursor-pointer text-xs font-normal justify-start text-muted-foreground bg-sidebar-accent/70 border border-border shadow-xs hover:!bg-background px-3 py-2"
          />
        }
      >
        <div className="flex flex-1 gap-2 items-center">
          <icons.Share className="size-4" />
          <span className="flex-1 text-left">{t`Share`}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="flex flex-col gap-1 p-2 w-(--radix-dropdown-menu-trigger-width)"
      >
        {SHARE_PROVIDERS.map(provider => {
          const Component = provider.component
          return (
            <DropdownMenuItem key={provider.name} className="cursor-pointer">
              <Component url={currentUrl} />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Facebook(props: { url: string }) {
  return (
    <share.FacebookShareButton
      url={props.url}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.FacebookIcon size={settings.ICON_SIZE} round />
        Facebook
      </div>
    </share.FacebookShareButton>
  )
}

function Twitter(props: { url: string }) {
  return (
    <share.TwitterShareButton
      url={props.url}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.TwitterIcon size={settings.ICON_SIZE} round />
        Twitter
      </div>
    </share.TwitterShareButton>
  )
}

function LinkedIn(props: { url: string }) {
  return (
    <share.LinkedinShareButton
      url={props.url}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.LinkedinIcon size={settings.ICON_SIZE} round />
        LinkedIn
      </div>
    </share.LinkedinShareButton>
  )
}

function WhatsApp(props: { url: string }) {
  return (
    <share.WhatsappShareButton
      url={props.url}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.WhatsappIcon size={settings.ICON_SIZE} round />
        WhatsApp
      </div>
    </share.WhatsappShareButton>
  )
}

function Telegram(props: { url: string }) {
  return (
    <share.TelegramShareButton
      url={props.url}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.TelegramIcon size={settings.ICON_SIZE} round />
        Telegram
      </div>
    </share.TelegramShareButton>
  )
}

function Reddit(props: { url: string }) {
  return (
    <share.RedditShareButton
      url={props.url}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.RedditIcon size={settings.ICON_SIZE} round />
        Reddit
      </div>
    </share.RedditShareButton>
  )
}

function Email(props: { url: string }) {
  return (
    <share.EmailShareButton
      url={props.url}
      style={{
        all: "unset",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
    >
      <div className="flex gap-2 flex-nowrap items-center cursor-pointer">
        <share.EmailIcon size={settings.ICON_SIZE} round />
        Email
      </div>
    </share.EmailShareButton>
  )
}

const SHARE_PROVIDERS = [
  { name: "Facebook", component: Facebook },
  { name: "Twitter", component: Twitter },
  { name: "LinkedIn", component: LinkedIn },
  { name: "WhatsApp", component: WhatsApp },
  { name: "Telegram", component: Telegram },
  { name: "Reddit", component: Reddit },
  { name: "Email", component: Email },
]
