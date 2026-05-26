import { join } from "node:path"
import { is } from "@electron-toolkit/utils"
import { BrowserWindow, shell } from "electron"
// @ts-expect-error
import iconPath from "#assets/fairspec-logo.svg?asset"
import * as settings from "#settings.ts"
import { store } from "./store.ts"

function isInternalUrl(url: string) {
  return url.startsWith("http://localhost:8000") || url.startsWith("file://")
}

export function createWindow() {
  const preloadFolder = join(import.meta.dirname, "..", "preload")

  const mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    ...(process.platform === "linux" ? { icon: iconPath } : {}),
    webPreferences: {
      preload: join(preloadFolder, "preload.js"),
      contextIsolation: true,
    },
  })

  const languageSlug = store.get("languageSlug")
  const urlPath = languageSlug ? `/${languageSlug}` : "/"

  if (is.dev) {
    mainWindow.loadURL(`http://localhost:8000${urlPath}`)
  } else {
    // See proxy config
    mainWindow.loadFile(urlPath)
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!isInternalUrl(url)) {
      shell.openExternal(url)
      return { action: "deny" }
    }
    return { action: "allow" }
  })

  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (!isInternalUrl(url)) {
      event.preventDefault()
      shell.openExternal(url)
    }
  })

  mainWindow.on("enter-full-screen", () => {
    mainWindow.webContents.send("window:fullScreenChanged", true)
  })
  mainWindow.on("leave-full-screen", () => {
    mainWindow.webContents.send("window:fullScreenChanged", false)
  })

  const zoomFactor = store.get("zoomFactor") ?? 1.0
  const zoomLevels = [0.5, 0.67, 0.75, 0.8, 0.9, 1.0, 1.1, 1.25, 1.5, 1.75, 2.0]

  mainWindow.once("ready-to-show", () => {
    mainWindow.webContents.setZoomFactor(zoomFactor)
    mainWindow.setTitle(settings.APP_NAME)
    mainWindow.setMenu(null)
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.on("before-input-event", (event, input) => {
    if (input.control) {
      if (input.key === "+" || input.key === "=") {
        const currentZoom = mainWindow.webContents.getZoomFactor()
        const nextLevel = zoomLevels.find(level => level > currentZoom)
        if (nextLevel) {
          mainWindow.webContents.setZoomFactor(nextLevel)
          store.set("zoomFactor", nextLevel)
        }
        event.preventDefault()
      } else if (input.key === "-" || input.key === "_") {
        const currentZoom = mainWindow.webContents.getZoomFactor()
        const prevLevel = [...zoomLevels].reverse().find(level => level < currentZoom)
        if (prevLevel) {
          mainWindow.webContents.setZoomFactor(prevLevel)
          store.set("zoomFactor", prevLevel)
        }
        event.preventDefault()
      } else if (input.key === "0") {
        mainWindow.webContents.setZoomFactor(1.0)
        store.set("zoomFactor", 1.0)
        event.preventDefault()
      }
    }
  })

  return mainWindow
}
