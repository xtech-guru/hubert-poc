import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./ArticlePreview.module.scss"

export const ArticlePreview = ({ title, description, img, category, slug }) => {
  if (!slug) throw new Error("Slug is missing in the passed data")
  const { localFile: imageFile, title: imageTitle } = img
  return (
    <article className={styles.articlePreviewWrapper}>
      <div className={styles.imageWrapper}>
        <GatsbyImage
          image={getImage(imageFile)}
          alt={imageTitle}
          className={styles.articleImage}
        />
        <div className={styles.categorySection}>
          <Link
            to={`/hubert/categories/${category.slug}`}
            aria-label="Category"
          >
            {category.title}
          </Link>
        </div>
      </div>
      <div>
        <p className={styles.title}>
          <Link to={`/hubert/articles/${slug}`} aria-label="Article">
            {title}
          </Link>
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: description }}
          className={styles.description}
        />
        <Link to={`/hubert/articles/${slug}`} className={styles.moreTextButton}>
          Mehr
        </Link>
      </div>
    </article>
  )
}
