import React from "react"
import Layout from "../components/layout"
import RelatedPosts from "../components/RelatedPosts"
import ArticleContent from "../components/ArticleContent"
import styled from "styled-components"

const ArticleTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <PageContainer>
        <ArticleContent
          title={pageContext.data.article.header.title}
          content={pageContext.data.article.content}
          category={pageContext.data.article.header.category_text}
          introduction={pageContext.data.article.header.introduction}
          author={pageContext.data.article.author}
          rating={pageContext.data.article.rating}
        />
        <RelatedPosts
          title={pageContext.data.article.related_posts.title}
          category={pageContext.data.article.header.category_text}
          posts={pageContext.data.article.related_posts.posts}
        />
      </PageContainer>
    </Layout>
  )
}

const PageContainer = styled.div`
  margin-top: 2.625rem;
`

export default ArticleTemplate
