import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import { Layout, Posts } from "../components"

import icon_arrow_blue from "../images/icon_arrow_blue.svg"
import icon_arrow_brown from "../images/icon_arrow_brown.svg"

const IndexPage = ({ data }) => {
  const articles = [...data.allContentfulArticle.nodes]
  const featuredArticle = articles[0]
  return (
    <Layout seo="Home">
      <PostsWrapper>
        <MainArticle
          mainArticleUrl={
            featuredArticle.featuredImage?.gatsbyImageData.images.fallback.src
          }
        >
          <div>
            <div>
              <Link
                to={`/categories/${featuredArticle.category.slug}`}
                aria-label="Category"
              >
                {featuredArticle.category.title}
              </Link>
            </div>
            <div>
              <Link to={`/articles/${featuredArticle.slug}`} aria-label="Link">
                {featuredArticle.title}
              </Link>
            </div>
            <MainArticleIntroduction>
              {featuredArticle.introduction}
            </MainArticleIntroduction>
            <Link to={`/articles/${featuredArticle.slug}`} aria-label="Home">
              <img src={icon_arrow_blue} alt="" />
              <img src={icon_arrow_brown} alt="" />
            </Link>
          </div>
        </MainArticle>
        <Posts data={articles} />
      </PostsWrapper>
    </Layout>
  )
}

const PostsWrapper = styled.div`
  @media (max-width: 767px) {
    margin-top: 14px;
    padding: 0 20px;
  }
  @media (min-width: 992px) {
    margin-top: 17px;
    padding: 0 14px;
  }
`

const MainArticle = styled.article`
  background-image: url("${props => props.mainArticleUrl}");
  padding-top: 30px;
  display: block;
  background-color: #f4efea;
  margin-bottom: 3.75rem;
  background-repeat: repeat-x;
  background-position: top;
  @media (max-width: 767px) {
    padding-top: 208px;
    background-size: 100% 250px;
    p {
      color: #756b62;
    }
  }
  text-align: center;
  a {
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
  @media (min-width: 768px) {
    background-size: cover;
  }
  > div {
    padding: 0 15px;
    > div:first-child {
      @media (max-width: 767px) {
        margin-bottom: 2.6875rem;
      }
      @media (min-width: 768px) {
        margin-bottom: 1.875rem;
      }
      position: relative;
      display: inline-block;
      bottom: auto;
      background-color: #f86968;
      padding: 5px 17px;
      color: #fff;
      a {
        font-weight: 700;
        font-size: 0.875rem;
        color: #fff;
        touch-action: manipulation;
        background-color: transparent;
      }
    }
    > div:nth-child(2) {
      margin: 0 auto;
      max-width: 700px;
      text-transform: uppercase;
      font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
        Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
      font-weight: 700;
      line-height: 1.1;
      color: inherit;
      a {
        font-size: 2rem;
        color: #4b3e31;
        @media (min-width: 992px) {
          font-size: 3rem;
          color: #fff;
          touch-action: manipulation;
          background-color: transparent;
        }
      }
    }

    > a {
      color: #71b3e7;
      background-color: transparent;
      touch-action: manipulation;
      text-decoration: none;
      img {
        width: 36px;
        padding-bottom: 30px;

        &:first-child {
          border-style: none;
          vertical-align: middle;
          @media (min-width: 768px) {
            display: none !important;
          }
        }
        img:first-of-type {
          @media (min-width: 768px) {
            margin-bottom: 2.6875rem;
            display: none !important;
          }
        }
        &:last-child {
          @media (max-width: 767px) {
            display: none !important;
          }
        }
      }
    }
  }
`
const MainArticleIntroduction = styled.p`
  max-width: 700px;
  margin: 20px auto;
  line-height: 1.44;

  @media (min-width: 768px) {
    margin-bottom: 90px;
    font-size: 1.125rem;
    color: #fff;
  }
`
export const query = graphql`
  query {
    allContentfulArticle(filter: { node_locale: { eq: "en-US" } }) {
      nodes {
        title
        introduction
        slug
        featuredImage {
          gatsbyImageData
          title
        }
        category {
          title
          slug
        }
      }
    }
  }
`

export default IndexPage
