import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const ArticlePreview = ({ title, description, img, category, slug }) => {
  if (!slug) throw new Error("Slug is missing in the passed data")
  const { localFile: imageFile, title: imageTitle } = img
  return (
    <ArticlePreviewWrapper>
      <ImageWrapper>
        <StyledGatsbyImage image={getImage(imageFile)} alt={imageTitle} />
        <Category>
          <Link
            to={`/hubert/categories/${category.slug}`}
            aria-label="Category"
          >
            {category.title}
          </Link>
        </Category>
      </ImageWrapper>
      <div>
        <Title>
          <Link to={`/hubert/articles/${slug}`} aria-label="Article">
            {title}
          </Link>
        </Title>
        <Description dangerouslySetInnerHTML={{ __html: description }} />
        <MoreTextButton to={`/hubert/articles/${slug}`}>Mehr</MoreTextButton>
      </div>
    </ArticlePreviewWrapper>
  )
}

const MoreTextButton = styled(Link)`
  color: #4e7b9f;
`

const ArticlePreviewWrapper = styled.article`
  @media (min-width: 768px) {
    padding-bottom: 61px;
    padding-right: 30px;
  }
  flex: 1 1 0;
  a {
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
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
    :hover {
      color: #4b3e31;
    }
  }
`
const Description = styled.p`
  color: #756b62;
  margin-bottom: 0.6875rem;
`
const ImageWrapper = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
`

const StyledGatsbyImage = styled(GatsbyImage)`
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  margin-bottom: 0;
`
const Category = styled.div`
  position: absolute;
  bottom: 10px;
  background-color: #f86968;
  padding: 5px 17px;
  a {
    color: #fff;
    font-family: Merriweather;
    font-weight: bold;
  }
  a:hover {
    color: #fff;
  }
`
