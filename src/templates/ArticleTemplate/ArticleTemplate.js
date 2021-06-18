import React from "react"

import * as styles from "./ArticleTemplate.module.scss"
import { Layout, ArticleContent, RelatedPosts } from "../../components"

const ArticleTemplate = ({ pageContext, location }) => {
  const {
    slug,
    title,
    featuredImage,
    content,
    category,
    introduction,
    author,
    crossLink,
  } = pageContext.data
  return (
    <Layout seo={title}>
      <div className={styles.container}>
        <ArticleContent
          slug={slug}
          title={title}
          img={featuredImage}
          content={content.childMarkdownRemark.html}
          references={content.references}
          category={category}
          introduction={introduction.childMarkdownRemark.html}
          author={author}
          location={location}
          crossLink={crossLink}
        />
        <RelatedPosts category={category} />
      </div>
    </Layout>
  )
}

export default ArticleTemplate
