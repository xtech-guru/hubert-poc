import React from "react"
import styled from "styled-components"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { AuthorBlock } from "../AuthorBlock"
import { RatingBlock } from "../RatingBlock"
import { ShareWidget } from "../ShareWidget"

export const ArticleContent = ({
  content,
  assets,
  img,
  title,
  category,
  introduction,
  author,
  rating,
  link,
}) => {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const img = assets.find(i => {
          return i.contentful_id === node.data.target.sys.id
        })
        return <GatsbyImage image={getImage(img)} alt="content image" />
      },
    },
  }

  return (
    <ContentWrapper>
      <header>
        <CategoryText>
          <Link to={`/categories/${category.slug}`}>{category.title}</Link>
        </CategoryText>
        <ArticleTitle>
          <Link to="#">{title}</Link>
        </ArticleTitle>
        <Introduction>{introduction}</Introduction>
        <hr />
        <ShareWidget author={{ name: author.name, slug: author.slug }} />
        <hr />
      </header>
      {img && <ArticleImage image={getImage(img)} alt={img.title} />}
      {content && (
        <Content>
          {documentToReactComponents(JSON.parse(content), richTextOptions)}
        </Content>
      )}
      <RatingBlock
        title="War dieser Artikel hilfreich?"
        image={require("../../images/rating_1_over.gif")}
        isLoading={false}
      />
      <AuthorBlock author={author} />
    </ContentWrapper>
  )
}

const Wrapper = styled.article`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
  @media (min-width: 1200px) {
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
  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`

const ContentWrapper = styled(Wrapper)`
  color: #756b62;
  width: 1140px;
  padding-right: 15px;
  padding-left: 15px;
  header {
    padding-left: 77px;
    padding-right: 233px;
  }
  blockquote {
    @media (min-width: 992px) {
      margin-right: -77px;
    }
    @media (min-width: 768px) {
      margin-right: -63px;
    }
    @media (min-width: 992px) {
      margin-left: -77px;
    }
    @media (min-width: 768px) {
      margin-left: -63px;
    }
    padding: 15px 0;
    font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
    font-size: 30px;
    line-height: 36px;
    font-weight: 700;
    color: #f86968;
    border-top: 3px solid #ffd0d0;
    border-bottom: 3px solid #ffd0d0;
  }
  .unpad-left {
    @media (min-width: 992px) {
      margin-left: -77px;
    }
    @media (min-width: 768px) {
      margin-bottom: 20px;
      margin-right: 30px;
      margin-left: -63px;
    }
    margin-bottom: 30px;
    @media (min-width: 768px) {
      float: left !important;
    }
  }
`
const CategoryText = styled.span`
  background-color: #f86968;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 5px 17px;
  a {
    color: #fff;
  }
`
const ArticleTitle = styled.div`
  font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-weight: 700;
  line-height: 1.1;
  margin: 20px 0 21px;
  font-size: 48px;
  text-transform: uppercase;
  a {
    color: #4b3e31;
  }
`
const Introduction = styled.p`
  font-size: 1.125rem;
  color: #9d958e;
  margin-bottom: 25px;
`

const ArticleImage = styled(GatsbyImage)`
  width: 100%;
  height: auto;
  max-width: 100%;
  img {
    vertical-align: middle;
  }
`
const Content = styled.div`
.gatsby-image-wrapper {
  margin-left: 0;
  margin-right: 0;
  max-width: 100%;
  height: auto;
  max-width: 500px;
  max-height : 495px;
  float: left !important;
  @media (min-width: 992px) {
    margin-left: -77px;
  }
  @media (min-width: 768px) {
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: -63px;
  }
}

h2:first-of-type{
  display:inline-block;
}
  margin: 30px 0;
  color: #756b62;
  padding-left: 77px;
  padding-right: 233px;
  .text-with_link {
    margin-right: -233px;
    background-color: #f4efea;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 30px 20px;
    .row {
      .text_content {
        color: #756b62;
        margin-bottom: 20px;
        font-size: 18px;
        font-weight: bold;
      }
      div:last-child {
        img {
          width: 20px;
          height: 18px;
          margin: 0;
        }
        a {
          color: #71b3e7;
          text-decoration: none;
        }
      }
    }
    @media (min-width: 768px) {
      margin-left: -63px;
      margin-right: -63px;
    }
    @media (min-width: 992px) {
      padding-left: 77px;
      padding-right: 233px;
    }

`
