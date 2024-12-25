import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "ch-border": "#1A2652", // editorGroup.border
        "ch-selection": "#ffffff1a", // editor.selectionBackground
        "ch-tabs-background": "#1a2652", // editorGroupHeader.tabsBackground
        "ch-tab-active-foreground": "#ffffffb3", // tab.activeForeground
        "ch-tab-inactive-foreground": "#a4cdfe", // tab.inactiveForeground
        "ch-background": "#212d63", // editor.background
        "ch-active-border": "var(--ch-24)", // tab.activeBorderTop
        "ch-line-number": "#ffffff4d", // editorLineNumber.foreground
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
} satisfies Config
