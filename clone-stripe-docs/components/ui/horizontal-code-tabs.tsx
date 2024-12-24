import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { z } from "zod"
import { parseProps, Block, CodeBlock } from "codehike/blocks"
import { Code } from "./code"

export function HorizontalCodeTabs(props: unknown) {
  console.log(props)
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
  return (
    <Tabs
      orientation="horizontal"
      className="flex gap-4 items-stretch"
      defaultValue={blocks[0].title!}
    >
      <TabsList className="flex-col h-auto flex-[1_1_33%] items-stretch">
        {blocks.map((block, index) => (
          <TabsTrigger
            className="justify-start p-3"
            value={block.title!}
            key={index}
          >
            {block.title}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex-[1_1_66%] overflow-hidden">
        {blocks.map((block, index) => (
          <TabsContent value={block.title!} key={index} className="h-full m-0">
            <Code className="h-full m-0 overflow-auto" codeblock={block.code} />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  )
}
