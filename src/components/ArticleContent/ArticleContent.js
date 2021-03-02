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
            <p>
              Von{" "}
              <a href={author.link} rel="author">
                {author.name}
              </a>
            </p>
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
              <img src={social_media.pinterest.icon} />
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
        image={rating.image}
        isLoading={rating.loading}
      />
      <AuthorBlock author={author} />
    </ContentWrapper>
  )
}
const SocialMediaBlock = styled.div`
  display: flex;
  span {
    margin-right: 10px;
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
`
