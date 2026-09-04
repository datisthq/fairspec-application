import { dirname } from "node:path"
import { denormalizeDataset, inferDataset } from "@fairspec/library"
import { temporaryDirectoryTask } from "tempy"
import { prefetchFile } from "#processes/main/actions/prefetch.ts"
import { publicEndpoint } from "#processes/main/endpoints/base/public.ts"
import { InferDatasetInput } from "#models/dataset.ts"

export const inferDatasetEndpoint = publicEndpoint
  .input(InferDatasetInput)
  .handler(async ({ input }) => {
    return await temporaryDirectoryTask(async folder => {
      const table = await prefetchFile(input.table, {
        folder,
        fileType: "table",
      })

      const dataset = await inferDataset({ resources: [{ data: table }] })
      const descriptor = denormalizeDataset(dataset, {
        basepath: table ? dirname(table) : undefined,
      })

      return descriptor
    })
  })
