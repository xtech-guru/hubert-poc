import React from "react"
import styled from "styled-components"
import AuthorBlock from "./AuthorBlock"

const ArticleContent = ({
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
    <ContentContainer>
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
              Von
              <a href={author.link} rel="author">
                {author.name}
              </a>
            </p>
          </div>
          <hr />
          <div>
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
          </div>
        </Author>
        <hr />
      </header>
      <div>
        <ArticleImage src={img} />
      </div>
      <Content dangerouslySetInnerHTML={{ __html: content }}></Content>

      <RatingContent>
        <hr />
        <Row>
          <RatingTitle>{rating.title}</RatingTitle>
          <div>
            <RatingWidget>
              <RatingWidgetTitle>RATE</RatingWidgetTitle>
              <div>
                <PostRating>
                  <img
                    id="rating_12053_1"
                    src={rating.image}
                    alt="1 Star"
                    title="1 Star"
                    onmouseover="current_rating(12053, 1, '1 Star');"
                    onmouseout="ratings_off(0, 0, 0);"
                    onclick="rate_post();"
                    onkeypress="rate_post();"
                  />
                  (No Ratings Yet)
                  <br />
                </PostRating>
                <PostRatingLoading id="post-ratings-12053-loading">
                  <img src={rating.loading} />
                  Loading...
                </PostRatingLoading>
              </div>
            </RatingWidget>
          </div>
        </Row>
        <hr />
      </RatingContent>
      <AuthorBlock author={author} />
    </ContentContainer>
  )
}

const ContainerWrapper = styled.article`
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

const ContentContainer = styled(ContainerWrapper)`
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

const RatingContent = styled.div`
  text-align: center;
  color: #c7bcb2;
  font-size: 0.875rem;
  padding-left: 77px;
  padding-right: 233px;
`
const Row = styled.div`
  margin-right: -15px;
  margin-left: -15px;
`

const RatingTitle = styled.div`
  text-align: left;
`
const RatingWidget = styled.div`
  text-align: right;
`

const RatingWidgetTitle = styled.div`
  margin-right: 25px;
`
const PostRating = styled.div`
  width: 100%;
  opacity: 1;
  img{
    cursor: "pointer", border: "0px"
  }
`
const PostRatingLoading = styled.div`
  display: none;
  height: 16px;
  text-align: left;
  img {
    border: 0;
    padding: 0;
    margin: 0;
    width: 16px;
    height: 16px;
  }
`

export default ArticleContent
