import type { MDXComponents } from "mdx/types"
import { HorizontalCodeTabs } from "./components/ui/horizontal-code-tabs"
import { docskit } from "@/components/docskit/components"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    HorizontalCodeTabs,
    ...components,
    ...docskit,
  }
}
