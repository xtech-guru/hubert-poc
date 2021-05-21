import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Layout } from "../components"

import back_icon from "../images/icon_arrow_blue.svg"

const AuthorTemplate = ({ pageContext }) => {
  const { fullName, details, featuredImage, wrottenArticles } = pageContext.data
  //todo: make something for authors that did not have articles
  return (
    <Layout seo={fullName}>
      <AuthorContainer>
        <AuthorBackLink to="/about" aria-label="About">
          <BackIcon src={back_icon} />
          <span>Zurück zu 'Über uns'</span>
        </AuthorBackLink>
        <AuthorName>{fullName.substr(0, fullName.indexOf(" "))}</AuthorName>
        <AvatarContainer>
          <GatsbyImage image={getImage(featuredImage)} alt="Author image" />
        </AvatarContainer>
        <p>{details.details}</p>
        <ul>
          <h2>Publizierte Artikel</h2>
          <hr />
          {wrottenArticles?.map(article => {
            return (
              <React.Fragment key={article.slug}>
                <li>
                  <Link to={`/articles/${article.slug}`} aria-label="Article">
                    {article.title}
                  </Link>
                </li>
                <hr />
              </React.Fragment>
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
  margin-top: 25px;
  @media (min-width: 576px) {
    width: 540px;
  }
  @media (min-width: 768px) {
    width: 720px;
    margin-top: 35px;
  }
  @media (min-width: 992px) {
    width: 960px;
    margin-top: 15px;
  }
  @media (min-width: 1200px) {
    width: 1140px;
  }

  p {
    color: #756b62;
    @media (min-width: 992px) {
      min-height: 202px;
    }
  }
  h2 {
    font-size: 1.375rem;
    color: #4b3e31;
    margin: 50px 0 30px;
  }
  a {
    color: #71b3e7;
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin-bottom: 60px;
    hr {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
`

const AuthorBackLink = styled(Link)`
  font-family: Merriweather, Georgia, Times New Roman, Times, serif;
  font-size: 0.875rem;
  font-weight: 400;
  &:hover {
    border-bottom: 3px solid #eaf2fa;
    padding-bottom: 2px;
    color: #71b3e7;
    outline-width: 0;
  }
  img {
    vertical-align: middle;
  }
`

const BackIcon = styled.img`
  width: 20px;
  height: 18px;
  transform: rotateY(180deg);
`

const AuthorName = styled.h1`
  color: #4b3e31;
  text-transform: uppercase;
  margin: 32px 0 30px;
  padding: 0;
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

const AvatarContainer = styled.div`
  .gatsby-image-wrapper {
    width: 125px !important;
    height: 125px !important;
    border-radius: 1000px;
    margin-bottom: 30px;
    @media (min-width: 768px) {
      float: right;
      margin-left: 30px;
      margin-bottom: 0;
      width: 157px !important;
      height: 157px !important;
    }
    @media (min-width: 992px) {
      width: 202px !important;
      height: 202px !important;
    }
  }
`

export default AuthorTemplate
