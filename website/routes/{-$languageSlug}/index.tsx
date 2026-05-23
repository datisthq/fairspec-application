import { Trans, useLingui } from "@lingui/react/macro"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#elements/card.tsx"
import * as icons from "#icons.ts"

export const Route = createFileRoute("/{-$languageSlug}/")({
  component: Component,
})

function Component() {
  const { t } = useLingui()

  const gridItems = [
    {
      id: "dataset",
      title: t`Dataset`,
      icon: icons.Dataset,
      path: "/{-$languageSlug}/dataset/validate",
      description: t`Validate dataset metadata against specifications and automatically infer dataset structure from your data files`,
      color: "text-blue-500",
    },
    {
      id: "table",
      title: t`Table`,
      icon: icons.Table,
      path: "/{-$languageSlug}/table/validate",
      description: t`Validate table structure for correctness and compliance, and automatically infer table schema definitions from your tabular data`,
      color: "text-green-500",
    },
    {
      id: "data",
      title: t`Data`,
      icon: icons.Data,
      path: "/{-$languageSlug}/data/validate",
      description: t`Validate data quality, check for inconsistencies and errors, and automatically infer comprehensive data schemas from your datasets`,
      color: "text-purple-500",
    },
    {
      id: "file",
      title: t`File`,
      icon: icons.File,
      path: "/{-$languageSlug}/file/validate",
      description: t`Describe file contents and structure in detail, and automatically infer file formats and encoding specifications`,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex self-start items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
        <icons.Sparkles className="size-3.5 text-primary" />
        <Trans>Technical preview</Trans>
      </div>
      <div className="text-content">
        <h1 id="top">Fairspec Application</h1>
        <p>
          <Trans>
            Visual tool for managing and validating tabular and structured data
          </Trans>
          .
        </p>
      </div>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gridItems.map(item => {
            const Icon = item.icon
            return (
              <Link key={item.id} to={item.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full group">
                  <CardHeader>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={item.color}>
                          <Icon className="w-8 h-8 group-hover:animate-[spin_0.5s_ease-in-out_1]" />
                        </div>
                        <CardTitle className="text-2xl">{item.title}</CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        {item.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
