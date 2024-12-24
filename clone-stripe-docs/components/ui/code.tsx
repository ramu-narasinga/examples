import { Pre, RawCode, highlight } from "codehike/code"

export async function Code({
  codeblock,
  className,
}: {
  codeblock: RawCode
  className?: string
}) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre code={highlighted} className={className} style={highlighted.style} />
  )
}
