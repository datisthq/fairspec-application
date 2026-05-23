import { useDomToc } from "#helpers/toc.ts"
import { PageToolbar } from "./PageToolbar.tsx"
import { MobileToc, Toc } from "./Toc.tsx"

export function Content(props: { children: React.ReactNode }) {
  const items = useDomToc()

  return (
    <>
      <MobileToc items={items}>
        <PageToolbar />
      </MobileToc>
      <div className="flex flex-1 gap-10 p-4 pt-8 md:p-10">
        <div className="flex-1 min-w-0 mx-auto max-w-3xl">{props.children}</div>
        <Toc items={items}>
          <PageToolbar />
        </Toc>
      </div>
    </>
  )
}
