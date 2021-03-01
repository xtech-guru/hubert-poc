import React from "react"
import styled from "styled-components"

export const ArticlePreview = ({ title, description, img, category, link }) => {
  return (
    <RelatedPost>
      <div>
        <RelatedPostImageContainer>
          <img src={img} />
          <PostCategory>
            <a href={category.link}>{category.name}</a>
          </PostCategory>
        </RelatedPostImageContainer>
        <div>
          <RelatedPostTitle>
            <a dangerouslySetInnerHTML={{ __html: title }} href={link}></a>
          </RelatedPostTitle>
          <RelatedPostDescription>{description}</RelatedPostDescription>
          <a href={link}>Mehr</a>
        </div>
      </div>
    </RelatedPost>
  )
}

const RelatedPost = styled.article`
  padding-right: 30px;
  padding-bottom: 61px;
  width: 33.333%;
`
const RelatedPostTitle = styled.p`
  margin-bottom: 0.625rem;
  font-size: 1.75rem;
  font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-weight: 700;
  line-height: 1.5;
  a {
    color: #4b3e31;
  }
`
const RelatedPostDescription = styled.p`
  color: #756b62;
  margin-bottom: 0.6875rem;
`
const RelatedPostImageContainer = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    margin-bottom: 0;
  }
`
const PostCategory = styled.div`
  position: absolute;
  bottom: 10px;
  background-color: #f86968;
  padding: 5px 17px;
  a {
    color: #fff;
  }
`
