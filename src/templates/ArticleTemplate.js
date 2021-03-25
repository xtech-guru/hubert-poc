import React from "react"
import styled from "styled-components"

import { Layout, ArticleContent, RelatedPosts } from "../components"

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
      <PageWrapper>
        <ArticleContent
          slug={slug}
          title={title}
          img={featuredImage}
          content={content.raw}
          assets={content.references}
          category={category}
          introduction={introduction}
          author={author}
          location={location}
          crossLink={crossLink}
        />
        <RelatedPosts category={category} />
      </PageWrapper>
    </Layout>
  )
}

const PageWrapper = styled.div`
  margin-top: 2.625rem;
`

export default ArticleTemplate
