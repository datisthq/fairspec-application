export function Content(props: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-10">
      {props.children}
    </div>
  )
}
