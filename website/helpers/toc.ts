import { useLocation } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export interface TocItem {
  url: string
  title: string
  depth: number
}

const DEPTH_BY_TAG: Record<string, number> = { H1: 1, H2: 2, H3: 3 }

export function useDomToc(): TocItem[] {
  const pathname = useLocation({ select: l => l.pathname })
  const [items, setItems] = useState<TocItem[]>([])

  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return

    let last = ""
    const scan = () => {
      const elements = main.querySelectorAll<HTMLElement>("h1[id], h2[id], h3[id]")
      const next: TocItem[] = []
      for (const element of elements) {
        next.push({
          url: `#${element.id}`,
          title: element.textContent ?? "",
          depth: DEPTH_BY_TAG[element.tagName] ?? 3,
        })
      }
      const signature = next.map(i => `${i.depth}:${i.url}:${i.title}`).join("|")
      if (signature !== last) {
        last = signature
        setItems(next)
      }
    }

    scan()

    const observer = new MutationObserver(scan)
    observer.observe(main, {
      childList: true,
      subtree: true,
      characterData: true,
    })

    return () => observer.disconnect()
  }, [pathname])

  return items
}
