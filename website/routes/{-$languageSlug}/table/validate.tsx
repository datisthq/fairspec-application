import { ValidateTableInput } from "@fairspec/engine"
import type * as fairspec from "@fairspec/metadata"
import { t } from "@lingui/core/macro"
import { Trans, useLingui } from "@lingui/react/macro"
import { useMutation } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import type * as z from "zod"
import { DesktopAlert } from "#components/desktop/Alert.tsx"
import { useAppForm } from "#components/form/hooks.ts"
import { Report } from "#components/report/Report.tsx"
import { Result } from "#components/result/Result.tsx"
import { Status, type StatusType } from "#components/result/Status.tsx"
import { Button } from "#elements/button.tsx"
import { FieldGroup } from "#elements/field.tsx"
import { engineQuery } from "#services/engine.ts"

export const Route = createFileRoute("/{-$languageSlug}/table/validate")({
  component: Component,
  head: () => {
    const title = t`Validate Table`
    const description = t`Validate table structure for correctness and compliance, and automatically infer table schema definitions from your tabular data`

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    }
  },
})

function Component() {
  return (
    <div className="flex flex-col gap-8">
      <Intro />
      <Form />
      <DesktopAlert />
    </div>
  )
}

function Intro() {
  return (
    <div className="text-content">
      <h1 id="top">
        <Trans>Validate Table</Trans>
      </h1>
      <p>
        <Trans>
          Validate table structure for correctness and compliance, and automatically infer
          table schema from your tabular data
        </Trans>
        .
      </p>
    </div>
  )
}

function Form() {
  const { t } = useLingui()
  const [error, setError] = useState<Error | undefined>()
  const [report, setReport] = useState<fairspec.Report | undefined>()
  const [statusType, setStatusType] = useState<StatusType | undefined>()

  const FormInput = ValidateTableInput.extend({})
  const form = useAppForm({
    defaultValues: {
      table: "",
      schema: "",
      dialect: "",
    } as z.infer<typeof FormInput>,
    validators: {
      onSubmit: FormInput,
    },
    onSubmit: async ({ value }) => {
      validateTable.mutate(value)
    },
  })

  const validateTable = useMutation(
    engineQuery.table.validate.mutationOptions({
      onMutate: () => {
        setStatusType("pending")
      },
      onSuccess: report => {
        setReport(report)
        setStatusType(report.valid ? "success" : "error")
      },
      onError: error => {
        setError(error)
        setStatusType("error")
        // TODO: Fix types
        // @ts-expect-error
        if (error.data.report) setReport(error.data.report)
      },
    }),
  )

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setStatusType(undefined)
      setReport(undefined)
      setError(undefined)
    }
  }

  return (
    <form
      id="form"
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        <form.AppField
          name="table"
          children={field => (
            <field.FileOrPathField
              label={t`Table`}
              description={t`Upload a file or provide a URL to a tabular data file`}
              placeholder="https://example.com/table.csv"
              fileType="table"
              required
            />
          )}
        />
        <form.AppField
          name="schema"
          children={field => (
            <field.FileOrPathField
              label={t`Schema`}
              description={t`Upload a file or provide a URL to a table schema`}
              placeholder="https://example.com/table.schema.json"
              fileType="schema"
            />
          )}
        />
        <form.AppField
          name="dialect"
          children={field => (
            <field.FileOrPathField
              label={t`Dialect`}
              description={t`Upload a file or provide a URL to a table dialect`}
              placeholder="https://example.com/table.dialect.json"
              fileType="dialect"
            />
          )}
        />
        <form.Subscribe
          selector={state => state.values.table}
          children={table => (
            <Button
              size="lg"
              type="submit"
              form="form"
              className="mt-4 w-full text-xl h-12"
              disabled={!table}
            >
              <Trans>Validate</Trans>
            </Button>
          )}
        />
      </FieldGroup>
      <Result
        open={!!statusType}
        onOpenChange={handleDialogOpenChange}
        status={
          <Status
            statusType={statusType}
            pendingTitle={t`Validating Table...`}
            successTitle={t`Valid Table`}
            errorTitle={error?.message ?? t`Invalid Table`}
          />
        }
      >
        {report?.valid === false && <Report report={report} />}
      </Result>
    </form>
  )
}
