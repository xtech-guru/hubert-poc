import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"

const ArticleTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <PageContainer>
        <ArticleContent
          title={pageContext.data.article.header.title}
          content={pageContext.data.article.content}
          category={pageContext.data.article.header.category_text}
          introduction={pageContext.data.article.header.introduction}
          author={pageContext.data.article.author}
          rating={pageContext.data.article.rating}
        />
        <RecommendedPosts
          title={pageContext.data.article.related_posts.title}
          category={pageContext.data.article.header.category_text}
          posts={pageContext.data.article.related_posts.posts}
        />
      </PageContainer>
    </Layout>
  )
}

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
                </PostRatingLoading>{" "}
              </div>
            </RatingWidget>
          </div>
        </Row>
        <hr />
      </RatingContent>

      <AuthorBlock>
        <div>
          <div>
            <a
              href="https://www.sorpetaler.de/hubert/author/sandra/"
              rel="author"
            >
              <img src="https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=96&r=g" />
            </a>
          </div>

          <div>
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
          </div>
        </div>
      </AuthorBlock>
    </ContentContainer>
  )
}

const RecommendedPosts = ({ title, category_text, posts }) => {
  return (
    <Posts>
      <PostsContainer>
        <RelatedPostsTitle>{title}</RelatedPostsTitle>
        <div>
          {posts.map(post => (
            <article>
              <div>
                <div>
                  <img src="https://www.sorpetaler.de/wp-content/uploads/2020/05/afz-assessment-foerderzentrum-neuwied_waechter-architekten.jpg" />
                  <div>
                    <a href="https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/">
                      {category_text}
                    </a>{" "}
                  </div>
                </div>
                <div>
                  <p>
                    <a
                      dangerouslySetInnerHTML={{ __html: post.title }}
                      href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/holzhaus-wettbewerb-verlaengert/"
                    ></a>
                  </p>
                  <p>{post.text}</p>
                  <a href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/holzhaus-wettbewerb-verlaengert/">
                    Mehr
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </PostsContainer>
    </Posts>
  )
}
const PageContainer = styled.div`
  margin-top: 2.625rem;
`
const ContentContainer = styled.article`
  color: #756b62;
  width: 1140px;
  padding-right: 15px;
  padding-left: 15px;
  header {
    padding-left: 77px;
    padding-right: 233px;
  }
`
const CategoryText = styled.span`
  background-color: #f86968;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 5px 17px;
  color: #fff;
`
const ArticleTitle = styled.div`
  a {
    font-size: 3rem;
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
`
const AuthorBlockName = styled.div`
  text-align: left;
`
const AuthorBlockDescription = styled.div`
  padding: 0;
  text-align: left;
`

const ReadMore = styled.div`
  color: #71b3e7;
`
const Posts = styled.div`
  margin-top: 1.3125rem;
  padding: 0 14px;
`
const PostsContainer = styled.div`
  width: 1140px;
  max-width: 100%;
`
const RelatedPostsTitle = styled.h2`
  color: #756b62;
  font-size: 0.875rem;
  article {
    padding-right: 30px;
    padding-bottom: 61px;
    width: 33.333%;
  }
`
export default ArticleTemplate
