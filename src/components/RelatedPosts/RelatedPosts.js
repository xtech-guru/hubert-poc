import React from "react"
import { StaticQuery, graphql } from "gatsby"

import * as styles from "./RelatedPosts.module.scss"
import { ArticlePreview } from "../ArticlePreview"

const articlesQuery = graphql`
  query {
    allContentfulArticle {
      nodes {
        category {
          title
          slug
        }
        title
        introduction {
          childMarkdownRemark {
            html
          }
        }
        slug
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 327)
            }
          }
          title
        }
      }
    }
  }
`
export const RelatedPosts = ({ category }) => {
  return (
    <div className={`${styles.postsWrapper} ${styles.container}`}>
      <h2 className={styles.postTitle}>DAS KÖNNTE DIR AUCH GEFALLEN</h2>
      <div className={styles.postsList}>
        <StaticQuery
          query={articlesQuery}
          render={data => {
            const articles = data.allContentfulArticle.nodes
            articles.filter(article => {
              return article.category.title === category.title
            })

            return articles
              .slice(0, 3)
              .map(({ title, introduction, featuredImage, category, slug }) => (
                <ArticlePreview
                  key={slug}
                  title={title}
                  description={introduction.childMarkdownRemark.html}
                  img={featuredImage}
                  category={category}
                  slug={slug}
                />
              ))
          }}
        />
      </div>
    </div>
  )
}
