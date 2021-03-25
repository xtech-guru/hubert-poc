import { Disqus } from "gatsby-plugin-disqus"
import React, { useMemo } from "react"

export function CommentBlock({ slug, title, url }) {
  const disqusConfig = useMemo(
    () => ({
      title,
      url,
      identifier: slug,
    }),
    [url, slug, title]
  )

  return <Disqus config={disqusConfig} />
}
