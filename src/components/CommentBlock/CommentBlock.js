import { Disqus } from "gatsby-plugin-disqus"
import React from "react"

export function CommentBlock({ location }) {
  const disqusConfig = {
    url: `${"https://www.sorpetaler.de/" + location.pathname}`,
    identifier: 1,
    title: "post1",
  }

  return <Disqus config={disqusConfig} />
}
