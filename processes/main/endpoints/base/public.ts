import { os } from "@orpc/server"
import { errorMiddleware } from "#processes/main/middlewares/error.ts"

export const publicEndpoint = os.use(errorMiddleware)
