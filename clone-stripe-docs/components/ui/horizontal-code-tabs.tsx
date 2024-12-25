import { z } from "zod"
import { parseProps, Block, CodeBlock } from "codehike/blocks"
import { Terminal } from "../docskit/terminal"
import { TabsClient } from "./horizontal-code-tabs.client"

export function HorizontalCodeTabs(props: unknown) {
  const { blocks } = parseProps(
    props,
    Block.extend({
      blocks: z.array(
        Block.extend({
          code: CodeBlock,
        })
      ),
    })
  )
  const tabs = blocks.map((block) => ({
    title: block.title!,
    children: (
      <Terminal
        className="h-full m-0 overflow-auto flex flex-col"
        codeblocks={[block.code]}
      />
    ),
  }))

  return <TabsClient tabs={tabs} />
}
