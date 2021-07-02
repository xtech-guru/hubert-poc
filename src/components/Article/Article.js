import React from "react"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import { container, imageContainer } from "./Article.module.scss"

export const Article = ({ content }) => {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { localFile: imageFile, description } = content.references.find(
          i => {
            return i.contentful_id === node.data.target.sys.id
          }
        )
        return (
          <GatsbyImage
            className={imageContainer}
            image={getImage(imageFile)}
            alt={description}
          />
        )
      },
    },
  }
  return (
    <article className={container}>
      {documentToReactComponents(JSON.parse(content.raw), richTextOptions)}
    </article>
  )
}
