import { Trans, useLingui } from "@lingui/react/macro"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#elements/card.tsx"
import * as icons from "#icons.ts"

export const Route = createFileRoute("/{-$languageSlug}/table/")({
  component: Component,
})

function Component() {
  const { t } = useLingui()
  const color = "text-green-500"

  const items = [
    {
      id: "preview",
      title: t`Preview Table`,
      icon: icons.Table,
      path: "/{-$languageSlug}/table/preview",
      description: t`Load and preview your data table`,
    },
    {
      id: "validate",
      title: t`Validate Table`,
      icon: icons.Table,
      path: "/{-$languageSlug}/table/validate",
      description: t`Validate table structure for correctness and compliance, and automatically infer table schema from your tabular data`,
    },
    {
      id: "infer-schema",
      title: t`Infer Schema`,
      icon: icons.Table,
      path: "/{-$languageSlug}/table/infer-schema",
      description: t`Automatically infer comprehensive table schema definitions from your tabular data`,
    },
    {
      id: "infer-dialect",
      title: t`Infer Dialect`,
      icon: icons.Table,
      path: "/{-$languageSlug}/file/infer-dialect",
      description: t`Automatically infer file formats, encoding specifications, and dialect parameters`,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="text-content">
        <h1 id="top">
          <Trans>Table</Trans>
        </h1>
        <p>
          <Trans>Preview, validate, and infer schemas for tabular data</Trans>.
        </p>
      </div>
      <div className="py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map(item => {
            const Icon = item.icon
            return (
              <Link key={item.id} to={item.path}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full group">
                  <CardHeader>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={color}>
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
