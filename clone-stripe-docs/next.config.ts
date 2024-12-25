import type { NextConfig } from "next"
import createMDX from "@next/mdx"
import { remarkCodeHike, recmaCodeHike, CodeHikeConfig } from "codehike/mdx"

const chConfig: CodeHikeConfig = {
  components: { code: "DocsKitCode", inlineCode: "DocsKitInlineCode" },
}

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [[remarkCodeHike, chConfig]],
    recmaPlugins: [[recmaCodeHike, chConfig]],
  },
})

export default withMDX(nextConfig)
