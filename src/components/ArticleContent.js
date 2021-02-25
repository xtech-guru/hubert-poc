import React from "react"
import styled from "styled-components"

const ArticleContent = ({
  content,
  title,
  category,
  introduction,
  author,
  rating,
}) => {
  return (
    <ContentContainer>
      <header>
        <CategoryText>
          <a href="https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/">
            {category}
          </a>
        </CategoryText>
        <ArticleTitle>
          <a
            dangerouslySetInnerHTML={{ __html: title }}
            href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/die-schoensten-holzhaeuser-gewinner/"
          ></a>
        </ArticleTitle>
        <Introduction>{introduction}</Introduction>
        <hr />
        <Author>
          <div>
            <p>
              Von{" "}
              <a
                href="https://www.sorpetaler.de/hubert/author/sandra/"
                rel="author"
              >
                {author.name}
              </a>
            </p>
          </div>
          <hr />
          <div>
            <span>Teilen</span>
            <a
              href="http://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.sorpetaler.de%2Fhubert%2Fnachhaltig-bauen-und-sanieren%2Fdie-schoensten-holzhaeuser-gewinner%2F&p[title]=Die sch%C3%B6nsten Holzh%C3%A4user %E2%80%93 Gewinner stehen fest"
              target="_blank"
            >
              <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_facebook_share.svg" />
            </a>
            <a
              href="http://twitter.com/share?text=Die sch%C3%B6nsten Holzh%C3%A4user %E2%80%93 Gewinner stehen fest&url=https%3A%2F%2Fwww.sorpetaler.de%2Fhubert%2Fnachhaltig-bauen-und-sanieren%2Fdie-schoensten-holzhaeuser-gewinner%2F"
              target="_blank"
            >
              <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_twitter_share.svg" />
            </a>
            <a
              href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.sorpetaler.de%2Fhubert%2Fnachhaltig-bauen-und-sanieren%2Fdie-schoensten-holzhaeuser-gewinner%2F&media=https%3A%2F%2Fwww.sorpetaler.de%2Fwp-content%2Fuploads%2F2020%2F10%2Fschoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg&description=Die sch%C3%B6nsten Holzh%C3%A4user %E2%80%93 Gewinner stehen fest"
              target="_blank"
            >
              <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_pinterest_share.svg" />
            </a>
          </div>
        </Author>
        <hr />
      </header>
      <div>
        <ArticleImage src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg" />
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
                    src="https://www.sorpetaler.de/wp-content/plugins/wp-postratings/images/heart/rating_1_off.gif"
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
                  <img src="https://www.sorpetaler.de/wp-content/plugins/wp-postratings/images/loading.gif" />
                  Loading...
                </PostRatingLoading>
              </div>
            </RatingWidget>
          </div>
        </Row>
        <hr />
      </RatingContent>

      <AuthorBlock>
        <AuthorBlockContainer>
          <AuthorBlockImage>
            <a
              href="https://www.sorpetaler.de/hubert/author/sandra/"
              rel="author"
            >
              <img src="https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=96&r=g" />
            </a>
          </AuthorBlockImage>

          <AuthorBlockParagraph>
            <AuthorBlockName>
              <a
                href="https://www.sorpetaler.de/hubert/author/sandra/"
                rel="author"
              >
                {author.name}
              </a>
            </AuthorBlockName>
            <div>
              <AuthorBlockDescription>
                {author.description}
                <ReadMore>
                  <a
                    href="https://www.sorpetaler.de/hubert/author/sandra/"
                    rel="author"
                  >
                    Mehr
                  </a>
                </ReadMore>
              </AuthorBlockDescription>
            </div>
          </AuthorBlockParagraph>
        </AuthorBlockContainer>
      </AuthorBlock>
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

const AuthorBlock = styled.div`
  margin: 30px 0 60px;
  color: #9d958e;
  text-transform: uppercase;
  font-size: 0.875rem;
  text-align: center;
  padding-left: 77px;
  padding-right: 233px;
  @media (min-width: 768px) {
    margin: 30px 0 60px;
  }
  @media (min-width: 992px) {
    padding-left: 77px;
    padding-right: 233px;
  }
  @media (min-width: 768px) {
    padding-left: 63px;
    padding-right: 63px;
  }
`

const AuthorBlockContainer = styled.div`
  display: flex !important;
  align-items: center !important;
  flex-direction: row;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  @media (min-width: 1200px) {
    margin-right: -15px;
    margin-left: -15px;
  }
  @media (min-width: 992px) {
    padding-left: 77px;
    padding-right: 233px;
    margin-right: -15px;
    margin-left: -15px;
  }
  @media (min-width: 768px) {
    padding-left: 63px;
    padding-right: 63px;
    margin-right: -15px;
    margin-left: -15px;
  }
  @media (min-width: 576px) {
    margin-right: -15px;
    margin-left: -15px;
  }

  img {
    float: left;
    border-radius: 50%;
    margin: 0;
  }
`
const AuthorBlockName = styled.div`
  a {
    color: #756b62;
    font-weight: 700;
  }
  text-align: left;
`
const AuthorBlockParagraph = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`
const AuthorBlockImage = styled.div`
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: auto;
  }
`
const AuthorBlockDescription = styled.div`
  padding: 0;
  text-align: left;
  text-transform: none;
  @media (min-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`

const ReadMore = styled.div`
  color: #71b3e7;
  a {
    color: #71b3e7;
  }
  @media (min-width: 768px) {
    display: inline-block;
  }
  padding-right: 0 !important;
  padding-left: 0 !important;
  @media (min-width: 768px) {
    flex: 0 0 auto;
    width: auto;
  }
  @media (min-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`

export default ArticleContent
