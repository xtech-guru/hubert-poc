import React from "react"
import styled from "styled-components"

import { Layout, ArticleContent, RelatedPosts } from "../components"

const ArticleTemplate = ({ pageContext }) => {
  const { data } = pageContext
  return (
    <Layout>
      <PageWrapper>
        <ArticleContent
          title={data.title}
          img={data.featuredImage}
          content={data.content.raw}
          assets={data.content.references}
          category={data.category.title}
          introduction={data.introduction}
        />
        <RelatedPosts category={data.category.title} />
      </PageWrapper>
    </Layout>
  )
}

const PageWrapper = styled.div`
  margin-top: 2.625rem;
`

export default ArticleTemplate
