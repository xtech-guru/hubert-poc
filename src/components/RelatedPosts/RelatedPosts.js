import React from "react"
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"

import { ArticlePreview } from "../ArticlePreview"

const articlesQuery = graphql`
  query {
    allContentfulArticle {
      nodes {
        category {
          title
        }
        title
        introduction
        slug
        featuredImage {
          fluid {
            src
          }
          title
        }
      }
    }
  }
`
export const RelatedPosts = ({ category }) => {
  return (
    <RelatedPostsWrapper>
      <RelatedPostsTitle>test</RelatedPostsTitle>
      <RelatedPostsList>
        <StaticQuery
          query={articlesQuery}
          render={data => {
            const articles = data.allContentfulArticle.nodes
            articles
              .filter(article => {
                return article.category.title === category
              })
              .slice(0, 3)
            return articles.map(
              ({ title, introduction, featuredImage, category, slug }) => (
                <ArticlePreview
                  title={title}
                  description={introduction}
                  img={featuredImage}
                  category={category.title}
                  slug={slug}
                />
              )
            )
          }}
        />
        ))}
      </RelatedPostsList>
    </RelatedPostsWrapper>
  )
}

const Wrapper = styled.div`
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

const RelatedPostsList = styled.div`
  display: flex;
`

const RelatedPostsWrapper = styled(Wrapper)`
  width: 1140px;
  max-width: 100%;
  @media (min-width: 992px) {
    margin-top: 1.3125rem;
    padding: 0 14px;
  }
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
