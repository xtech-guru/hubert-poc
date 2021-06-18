import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./ArticleContent.module.scss"
import { AuthorBlock } from "../AuthorBlock"
import { ShareWidget } from "../ShareWidget"
import { CommentBlock } from "../CommentBlock"
import { parse } from "../../utils/shotCodeParser"

export const ArticleContent = ({
  content,
  img,
  slug,
  title,
  category,
  introduction,
  author,
  location,
}) => {
  const { localFile: imageFile, title: imageTitle } = img
  return (
    <article className={styles.container}>
      <header>
        <span className={styles.text}>
          <Link
            to={`/hubert/categories/${category.slug}`}
            aria-label="Category"
          >
            {category.title}
          </Link>
        </span>
        <h1 className={styles.title}>
          <Link to={`/hubert/articles/${slug}`} aria-label="Article">
            {title}
          </Link>
        </h1>
        <p
          dangerouslySetInnerHTML={{ __html: parse(introduction) }}
          className={styles.introduction}
        />
        <hr />
        <ShareWidget
          author={{ name: author.fullName, slug: author.slug }}
          location={location}
        />
        <hr />
      </header>
      {img && (
        <GatsbyImage
          image={getImage(imageFile)}
          className={styles.image}
          alt={imageTitle}
        />
      )}
      {content && (
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: parse(content) }}
        />
      )}
      <hr />
      <AuthorBlock author={author} />
      <CommentBlock url={location.href} title={title} slug={slug} />
    </article>
  )
}
