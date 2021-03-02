import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import { Layout } from "../components"

const AuthorTemplate = ({ pageContext }) => {
  const { author } = pageContext.data
  return (
    <Layout>
      <AuthorContainer>
        <Link to="/about">
          <BackIcon src={author.arrow_icon} />
          <span>Zurück zu 'Über uns'</span>
        </Link>
        <AuthorName>{author.name}</AuthorName>
        <AvatarContainer>
          <img src={author.img} />
        </AvatarContainer>
        <p>{author.description}</p>
        <ul>
          <h2>Publizierte Artikel</h2>
          <hr />
          {author.publiched_articles.map((article, index) => {
            return (
              <>
                <li key={index}>
                  <a
                    href={article.link}
                    rel="bookmark"
                    title={`Permanent Link:${article.title}`}
                  >
                    {article.title}
                  </a>
                </li>
                <hr />
              </>
            )
          })}
        </ul>
      </AuthorContainer>
    </Layout>
  )
}

const AuthorContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  @media (min-width: 768px) {
    width: 720px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  @media (min-width: 992px) {
    margin-top: 15px;
    padding-right: 15px;
    padding-left: 15px;
  }
  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
  p {
    color: #756b62;
    @media (min-width: 992px) {
      min-height: 202px;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 60px;
  }
  h2 {
    font-size: 1.375rem;
    color: #4b3e31;
    margin: 50px 0 30px;
  }
  a {
    color: #71b3e7;
  }
`
const AuthorName = styled.h1`
  color: #4b3e31;
  text-transform: uppercase;
  margin: 32px 0 30px;
  padding: 0px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: bold;
  text-rendering: optimizeLegibility;
  font-size: 2.25rem;
  line-height: 1.1;
  @media (min-width: 768px) {
    font-size: 3rem;
  }
  @media (min-width: 992px) {
    font-size: 3rem;
  }
`
const BackIcon = styled.img`
  width: 20px;
  height: 18px;
  transform: rotateY(180deg);
  margin: 0;
`

const AvatarContainer = styled.div`
  float: right;
  margin-left: 30px;
  img {
    border-radius: 50%;
    width: 125px;
    height: auto;
    @media (min-width: 992px) {
      width: 202px;
      height: auto;
    }
  }
`

export default AuthorTemplate
