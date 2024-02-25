import { CodeBlock, CodeContent } from "codehike"
import { CopyButton } from "./copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"

export function ResourceCode({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <div className="border border-[#1e647a] min-w-0 flex-1 rounded-lg max-w-lg ml-auto bg-[#184C5E]">
      <div className="font-mono px-4 py-1 text-[#8fbfd7] bg-[#133A48] m-0.5 rounded-lg">
        {"{}   " + codeblock.meta}
      </div>
      <CodeContent
        codeblock={codeblock}
        config={{ theme: "dark-plus" }}
        className="min-h-[40rem] max-h-[600px] m-0 whitespace-pre-wrap"
      />
    </div>
  )
}

export function RequestCode({
  codeblocks,
  path,
  method,
}: {
  codeblocks: CodeBlock[]
  method: "GET" | "POST" | "PUT" | "DEL"
  path: string
}) {
  return (
    <Tabs
      defaultValue="Node.js"
      className="border border-[#1e647a] min-w-0 flex-1 rounded-lg max-w-lg ml-auto mb-4 bg-[#184C5E]"
    >
      <div className="font-mono px-4 text-[#8fbfd7] bg-[#133A48] m-0.5 rounded">
        {path}
      </div>
      <div className="font-mono py-1 text-[#8fbfd7] mx-0.5 flex gap-1">
        <TabsList className="px-4 bg-[#133A48] rounded flex-1 flex gap-4">
          {codeblocks.map(({ meta }) => (
            <TabsTrigger
              value={meta!}
              className="data-[state=active]:text-white data-[state=active]:border-b border-white"
            >
              {meta}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="px-1 bg-[#133A48] rounded flex items-center hover:bg-[#257a95] transition-colors hover:text-white">
          {codeblocks.map((codeblock) => (
            <TabsContent value={codeblock.meta!} asChild>
              <CopyButton text={codeblock.value} />
            </TabsContent>
          ))}
        </div>
      </div>
      {codeblocks.map((codeblock) => (
        <TabsContent value={codeblock.meta!}>
          <CodeContent
            codeblock={codeblock}
            config={{ theme: "dark-plus" }}
            className="max-h-[600px] m-0 whitespace-pre-wrap"
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export function ResponseCode({ codeblock }: { codeblock: CodeBlock }) {
  return (
    <div className="border border-cyan-950 min-w-0 flex-1 rounded-lg max-w-lg ml-auto bg-[#0A1D26]">
      <div className="font-mono px-4 py-1 text-[#8fbfd7] bg-[#061219] m-0.5 rounded-lg flex gap-3 items-center">
        <span>{"{}"}</span>
        <span>{codeblock.meta}</span>
        <span className="ml-auto border rounded border-cyan-950 mt-0.5 text-sm w-[5ch] text-center">
          JSON
        </span>
      </div>

      <CodeContent
        codeblock={codeblock}
        config={{ theme: "dark-plus" }}
        className="max-h-[600px] m-0 whitespace-pre-wrap"
      />
    </div>
  )
}
