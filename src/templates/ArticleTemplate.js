import React from "react"
import styled from "styled-components"

import { Layout, ArticleContent, RelatedPosts } from "../components"

const ArticleTemplate = ({ pageContext }) => {
  const {
    title,
    featuredImage,
    content,
    category,
    introduction,
    author,
  } = pageContext.data
  return (
    <Layout seo={title}>
      <PageWrapper>
        <ArticleContent
          title={title}
          img={featuredImage}
          content={content.raw}
          assets={content.references}
          category={category}
          introduction={introduction}
          author={author}
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
