import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

export const ArticlePreview = ({ title, description, img, category, slug }) => {
  return (
    <ArticlePreviewWrapper>
      <ImageWrapper>
        <img src={img.fluid.src} />
        <Category>
          <a href="#">{category}</a>
        </Category>
      </ImageWrapper>
      <div>
        <Title>
          <Link to={`articles/${slug}`}>{title}</Link>
        </Title>
        <Description>{description}</Description>
        <Link to={`articles/${slug}`}>Mehr</Link>
      </div>
    </ArticlePreviewWrapper>
  )
}

const ArticlePreviewWrapper = styled.article`
  padding-right: 30px;
  padding-bottom: 61px;
  flex: 1 1 0px;
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
  a:hover {
    color: #4b3e31;
  }
`
const Description = styled.p`
  color: #756b62;
  margin-bottom: 0.6875rem;
`
const ImageWrapper = styled.div`
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
