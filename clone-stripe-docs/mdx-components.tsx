import type { MDXComponents } from "mdx/types"
import { HorizontalCodeTabs } from "./components/ui/horizontal-code-tabs"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    HorizontalCodeTabs,
    ...components,
  }
}
