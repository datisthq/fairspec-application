import { onError } from "@orpc/server"
import { RPCHandler } from "@orpc/server/message-port"
import { inferDataSchemaEndpoint } from "#processes/main/endpoints/dataSchema/infer.ts"
import { validateDataEndpoint } from "#processes/main/endpoints/data/validate.ts"
import { inferDatasetEndpoint } from "#processes/main/endpoints/dataset/infer.ts"
import { validateDatasetEndpoint } from "#processes/main/endpoints/dataset/validate.ts"
import { inferDialectEndpoint } from "#processes/main/endpoints/dialect/infer.ts"
import { validateFileEndpoint } from "#processes/main/endpoints/file/validate.ts"
import { previewTableEndpoint } from "#processes/main/endpoints/table/preview.ts"
import { validateTableEndpoint } from "#processes/main/endpoints/table/validate.ts"
import { inferTableSchemaEndpoint } from "#processes/main/endpoints/tableSchema/infer.ts"
import { logger } from "#processes/main/logger.ts"

export const router = {
  data: {
    validate: validateDataEndpoint,
  },
  dataSchema: {
    infer: inferDataSchemaEndpoint,
  },
  dataset: {
    infer: inferDatasetEndpoint,
    validate: validateDatasetEndpoint,
  },
  dialect: {
    infer: inferDialectEndpoint,
  },
  file: {
    validate: validateFileEndpoint,
  },
  table: {
    preview: previewTableEndpoint,
    validate: validateTableEndpoint,
  },
  tableSchema: {
    infer: inferTableSchemaEndpoint,
  },
}

export type Router = typeof router

export const engineRpcHandler = new RPCHandler(router, {
  interceptors: [
    onError(error => {
      logger.error(String(error))
    }),
  ],
})
