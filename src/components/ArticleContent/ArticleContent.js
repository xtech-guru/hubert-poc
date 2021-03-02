import React from "react"
import styled from "styled-components"

import { AuthorBlock } from "../AuthorBlock"
import { RatingBlock } from "../RatingBlock"

export const ArticleContent = ({
  content,
  img,
  title,
  category,
  introduction,
  author,
  rating,
  link,
  social_media,
}) => {
  return (
    <ContentWrapper>
      <header>
        <CategoryText>
          <a href={category.link}>{category.name}</a>
        </CategoryText>
        <ArticleTitle>
          <a dangerouslySetInnerHTML={{ __html: title }} href={link}></a>
        </ArticleTitle>
        <Introduction>{introduction}</Introduction>
        <hr />
        <Author>
          <div>
            Von{" "}
            <a href={author.link} rel="author">
              {author.name}
            </a>
          </div>
          <hr />
          <SocialMediaBlock>
            <span>Teilen</span>
            <a href={social_media.facebook.link} target="_blank">
              <img src={social_media.facebook.icon} />
            </a>
            <a href={social_media.twitter.link} target="_blank">
              <img src={social_media.twitter.icon} />
            </a>
            <a href={social_media.pinterest.link} target="_blank">
              <img src={social_media.pinterest.icon} /> Enregistrer
            </a>
          </SocialMediaBlock>
        </Author>
        <hr />
      </header>
      <div>
        <ArticleImage src={img} />
      </div>
      <Content dangerouslySetInnerHTML={{ __html: content }}></Content>
      <RatingBlock
        title={rating.title}
        image={rating.img}
        isLoading={rating.loading}
      />
      <AuthorBlock author={author} />
    </ContentWrapper>
  )
}
const SocialMediaBlock = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-left: 30px;
  }
  a:last-child {
    height: 20px;
    border-radius: 2px;
    padding: 0 4px 0 0;
    text-decoration: none;
    font: 11px/20px "Helvetica Neue", Helvetica, sans-serif;
    font-weight: bold;
    color: #fff !important;
    background: #111
      url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zd…AyMS45NSwxLjY4NiAxNC43MzMsMS42ODYiIGZpbGw9IiMxMTEiPjwvcGF0aD48L2c+PC9zdmc+)
      3px 50% no-repeat;
    background-size: 14px 14px;
    img {
      width: 20px;
    }
  }
  img {
    margin: 0;
  }
`
const Wrapper = styled.article`
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

const Author = styled.div`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  color: #c7bcb2;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  a {
    color: #c7bcb2;
    text-decoration: underline;
  }
`
const ArticleImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  img {
    vertical-align: middle;
  }
`
const Content = styled.div`
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
      margin-left: -77px;
    }

    @media (min-width: 768px) {
      padding-top: 40px;
      padding-bottom: 40px;
      padding-left: 63px;
      padding-right: 63px;
    }
  }
`
