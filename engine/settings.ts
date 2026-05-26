export const ORPC_PREFIX = "/"
export const OPENAPI_PREFIX = "/api"

export const CORS_METHODS = ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"]
export const CORS_ORIGINS = ["http://localhost:4000", "https://application.fairspec.org"]

export const DATA_MAX_BYTES = 100 * 1024 * 1024 // 100MB
export const METADATA_MAX_BYTES = 1 * 1024 * 1024 // 1MB

export const IS_DESKTOP = !!process.versions.electron
