import theme from "./theme.mjs"
import {
  AnnotationHandler,
  BlockAnnotation,
  highlight,
  Pre,
  RawCode,
} from "codehike/code"
import { TerminalClient } from "./terminal.client"
import { wordWrap } from "./annotations/word-wrap"
import { CommandBlock } from "./annotations/terminal-command"
import { OutputBlock } from "./annotations/terminal-output"
import { cn } from "../../lib/utils"
import { tokenTransitions } from "./annotations/token-transitions"

export async function Terminal(props: {
  codeblocks: RawCode[]
  storage?: string
  className?: string
}) {
  const tabs = await Promise.all(
    props.codeblocks.map(async (codeblock) => {
      const highlighted = await highlightCommands(codeblock)
      return {
        name: codeblock.meta,
        pre: (
          <Pre
            code={highlighted}
            handlers={[output, wordWrap, command, tokenTransitions]}
            className={cn(
              "bg-ch-background py-3 px-2 m-0 leading-6 font-mono flex-1 rounded-none"
            )}
            style={highlighted.style}
          />
        ),
      }
    })
  )

  return (
    <TerminalClient
      tabs={tabs}
      storeKey={props.storage}
      key={props.storage || ""}
      className={props.className}
    />
  )
}

const output: AnnotationHandler = {
  name: "output",
  Block: OutputBlock,
}

const command: AnnotationHandler = {
  name: "command",
  Block: CommandBlock,
}

async function highlightCommands(codeblock: RawCode) {
  const { annotations, value } = extractAnnotations(codeblock.value)
  const highlighted = await highlight({ ...codeblock, value }, theme)
  highlighted.annotations = [...annotations, ...highlighted.annotations]
  highlighted.tokens = highlighted.tokens.flatMap((token) => {
    // split words (include the spaces as tokens)
    if (typeof token === "string") {
      return token.split(/(\s+)/)
    }
    const [content, ...rest] = token
    const splits = content.split(/(\s+)/)
    return splits.map((split) => [split, ...rest]) as any
  })
  return highlighted
}

/**
 * Find the commands and output in the terminal code, and create the respective annotations.
 */
function extractAnnotations(code: string) {
  const lines = code.split(/\r?\n/)
  const annotations = [] as BlockAnnotation[]
  lines.forEach((line, index) => {
    if (line.startsWith("$ ")) {
      annotations.push({
        name: "command",
        query: line.slice(2),
        fromLineNumber: index + 1,
        toLineNumber: index + 1,
      })
    } else {
      let last = annotations[annotations.length - 1]
      if (last.name === "command" && last.query.endsWith("\\")) {
        last.query = last.query + "\n" + line
        last.toLineNumber = index + 1
      } else if (!last || last.name !== "output") {
        annotations.push({
          name: "output",
          query: "",
          fromLineNumber: index + 1,
          toLineNumber: index + 1,
        })
      } else if ("toLineNumber" in last) {
        last.toLineNumber = index + 1
      }
    }
  })
  const codeWithoutPrompt = lines
    .map((line) => line.replace(/^\$ /, ""))
    .join("\n")
  return { annotations, value: codeWithoutPrompt }
}
