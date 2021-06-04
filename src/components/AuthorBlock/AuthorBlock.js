import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./AuthorBlock.module.scss"

export const AuthorBlock = ({ author }) => (
  <div className={styles.widgetBlock}>
    <div className={styles.blockWrapper}>
      <div>
        <Link to={`/hubert/authors/${author.slug}`} aria-label="Author">
          <GatsbyImage
            className={styles.authorImage}
            image={getImage(author.featuredImage)}
          />
        </Link>
      </div>
      <div className={styles.paragraphBlock}>
        <div className={styles.authorName}>
          <Link to={`/hubert/authors/${author.slug}`} aria-label="Author">
            {author.fullName}
          </Link>
        </div>
        <div>
          <div className={styles.descriptionBlock}>
            {author.details.details}
            <div className={styles.readMore}>
              <Link
                to={`/hubert/authors/${author.slug}`}
                aria-label="Read more"
              >
                Mehr
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
