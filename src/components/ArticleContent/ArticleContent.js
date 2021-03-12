import React from "react"
import styled from "styled-components"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import { AuthorBlock } from "../AuthorBlock"
import { RatingBlock } from "../RatingBlock"

const author = {
  name: "SANDRA STEIN",
  description:
    "Sandra ist hauptberuflich Digital Marketing Managerin und beschäftigt sich seit vielen Jahren mit den neuesten Trends im Internet. Seit 2016 arbeitet sie in der Baubranche. Ihr besonderes Interesse gilt dabei dem Thema nachhaltig Bauen und Leben. Weil sie so gerne spricht, ist sie unsere Hauptinterviewführerin",
  link: "https://www.sorpetaler.de/hubert/author/sandra/",
  avatar:
    "https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=96&r=g",
}
export const ArticleContent = ({
  content,
  assets,
  img,
  title,
  category,
  introduction,
}) => {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const img = assets.find(i => {
          return i.contentful_id === node.data.target.sys.id
        })
        return <img src={img?.fluid.src} alt="test" />
      },
    },
  }

  return (
    <ContentWrapper>
      <header>
        <CategoryText>
          <a href={category}>{category}</a>
        </CategoryText>
        <ArticleTitle>
          <a dangerouslySetInnerHTML={{ __html: title }} href="#"></a>
        </ArticleTitle>
        <Introduction>{introduction}</Introduction>
        <hr />
        <Author>
          <div>
            Von{" "}
            <a href={author.link} rel="author">
              SANDRA
            </a>
          </div>
          <hr />
          <SocialMediaBlock>
            <span>Teilen</span>
            <a href="#" target="_blank">
              <img
                src={
                  "https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_facebook_share.svg"
                }
              />
            </a>
            <a href="#" target="_blank">
              <img
                src={
                  "https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_twitter_share.svg"
                }
              />
            </a>
            <a href="#" target="_blank">
              <img
                src={
                  "https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_pinterest_share.svg"
                }
              />{" "}
              Enregistrer
            </a>
          </SocialMediaBlock>
        </Author>
        <hr />
      </header>
      {img && <ArticleImage src={img.fluid.src} alt={img.title} />}
      {content && (
        <Content>
          {documentToReactComponents(JSON.parse(content), richTextOptions)}
        </Content>
      )}
      <RatingBlock
        title="War dieser Artikel hilfreich?"
        image={
          "https://www.sorpetaler.de/wp-content/plugins/wp-postratings/images/heart/rating_1_over.gif"
        }
        isLoading={false}
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
    }
  img {
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
    height: auto;
    max-width: 500px;
    float: left !important;
    @media (min-width: 992px) {
      margin-left: -77px;
    }

    @media (min-width: 768px) {
      padding-top: 40px;
      padding-bottom: 40px;
      padding-left: 63px;
      padding-right: 63px;
      margin-bottom: 20px;
      margin-right: 30px;
      margin-left: -63px;
    }
  }
`
