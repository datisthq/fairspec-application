import { useLocation } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export interface TocItem {
  url: string
  title: string
  depth: number
}

export function useDomToc(): TocItem[] {
  const pathname = useLocation({ select: l => l.pathname })
  const [items, setItems] = useState<TocItem[]>([])

  useEffect(() => {
    const handle = setTimeout(() => {
      const elements = document.querySelectorAll<HTMLElement>(
        "main h1[id], main h2[id], main h3[id]",
      )
      const depthByTag: Record<string, number> = { H1: 1, H2: 2, H3: 3 }
      const next: TocItem[] = []
      for (const element of elements) {
        next.push({
          url: `#${element.id}`,
          title: element.textContent ?? "",
          depth: depthByTag[element.tagName] ?? 3,
        })
      }
      setItems(next)
    }, 0)
    return () => clearTimeout(handle)
  }, [pathname])

  return items
}
