import React from "react"
import styled from "styled-components"
import { ArticlePreview } from "../ArticlePreview"

export const RelatedPosts = ({ title, posts }) => {
  return (
    <RelatedPostsWrapper>
      <RelatedPostsTitle>{title}</RelatedPostsTitle>
      <RelatedPostsList>
        {posts.map(post => (
          <ArticlePreview
            title={post.title}
            description={post.excerpt}
            img={post.img}
            link={post.link}
            category={post.category}
          />
        ))}
      </RelatedPostsList>
    </RelatedPostsWrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
  media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
  }
  @media (min-width: 768px) {
    padding-right: 15px;
    padding-left: 15px;
    width: 720px;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
`

const RelatedPostsList = styled.div`
  display: flex;
`

const RelatedPostsWrapper = styled(Wrapper)`
  width: 1140px;
  max-width: 100%;
  @media (min-width: 992px) {
    margin-top: 1.3125rem;
    padding: 0 14px;
  }
`
const RelatedPostsTitle = styled.h2`
  color: #756b62;
  font-size: 0.875rem;
  article {
    padding-right: 30px;
    padding-bottom: 61px;
    width: 33.333%;
  }
`
