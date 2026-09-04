import { inferTableSchema } from "@fairspec/library"
import { temporaryDirectoryTask } from "tempy"
import { prefetchFile } from "#processes/main/actions/prefetch.ts"
import { publicEndpoint } from "#processes/main/endpoints/base/public.ts"
import { InferTableSchemaInput } from "#models/tableSchema.ts"

export const inferTableSchemaEndpoint = publicEndpoint
  .input(InferTableSchemaInput)
  .handler(async ({ input }) => {
    return await temporaryDirectoryTask(async folder => {
      const [table, dialect] = await Promise.all([
        prefetchFile(input.table, { folder, fileType: "table" }),
        prefetchFile(input.dialect, { folder, fileType: "dialect" }),
      ])

      const schema = await inferTableSchema({
        data: table,
        fileDialect: dialect,
      })

      return schema
    })
  })
