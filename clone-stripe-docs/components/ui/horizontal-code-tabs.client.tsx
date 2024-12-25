"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

export function TabsClient({
  tabs,
}: {
  tabs: {
    title: string
    children: React.ReactNode
  }[]
}) {
  const [currentTitle, setCurrentTitle] = useState(tabs[0].title)
  const current = tabs.find((tab) => tab.title === currentTitle) || tabs[0]

  return (
    <Tabs
      value={currentTitle}
      onValueChange={setCurrentTitle}
      orientation="horizontal"
      className="flex gap-4 items-stretch"
    >
      <TabsList className="flex-col h-auto flex-[1_1_33%] items-stretch">
        {tabs.map((tab, index) => (
          <TabsTrigger
            className="justify-start p-3"
            value={tab.title}
            key={index}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-[1_1_66%] overflow-hidden">
        <TabsContent value={current.title} className="h-full m-0">
          {current.children}
        </TabsContent>
      </div>
    </Tabs>
  )
}
