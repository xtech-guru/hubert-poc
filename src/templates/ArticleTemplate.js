import React from "react"
import styled from "styled-components"
import { Layout, ArticleContent, RelatedPosts } from "../components"

const ArticleTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <PageContainer>
        <ArticleContent
          title={pageContext.data.article.header.title}
          link={pageContext.data.article.header.link}
          img={pageContext.data.article.img}
          content={pageContext.data.article.content}
          category={pageContext.data.article.header.category}
          introduction={pageContext.data.article.header.introduction}
          author={pageContext.data.article.author}
          rating={pageContext.data.article.rating}
          social_media={pageContext.data.article.social_media}
        />
        <RelatedPosts
          title={pageContext.data.article.related_posts.title}
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
