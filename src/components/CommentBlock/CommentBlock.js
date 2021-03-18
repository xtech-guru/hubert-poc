import { Disqus } from "gatsby-plugin-disqus"
import React from "react"
import { useLocation } from "@reach/router"

export function CommentBlock() {
  const location = useLocation()

  const disqusConfig = {
    url: `${"https://www.sorpetaler.de/" + location.pathname}`,
    identifier: 1,
    title: "post1",
  }

  return <Disqus config={disqusConfig} />
}
