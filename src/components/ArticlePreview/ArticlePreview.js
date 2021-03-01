import React from "react"
import styled from "styled-components"

export const ArticlePreview = ({ title, description, img, category, link }) => {
  return (
    <ArticlePreviewContainer>
      <ImageContainer>
        <img src={img} />
        <Category>
          <a href={category.link}>{category.name}</a>
        </Category>
      </ImageContainer>
      <div>
        <Title>
          <a dangerouslySetInnerHTML={{ __html: title }} href={link}></a>
        </Title>
        <Description>{description}</Description>
        <a href={link}>Mehr</a>
      </div>
    </ArticlePreviewContainer>
  )
}

const ArticlePreviewContainer = styled.article`
  padding-right: 30px;
  padding-bottom: 61px;
`
const Title = styled.p`
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
const Description = styled.p`
  color: #756b62;
  margin-bottom: 0.6875rem;
`
const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    margin-bottom: 0;
  }
`
const Category = styled.div`
  position: absolute;
  bottom: 10px;
  background-color: #f86968;
  padding: 5px 17px;
  a {
    color: #fff;
  }
`
