import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const AuthorBlock = ({ author }) => (
  <AuthorBlockWidget>
    <AuthorBlockWrapper>
      <AuthorBlockImage>
        <Link to={`/hubert/authors/${author.slug}`} aria-label="Author">
          <StyledGatsbyImage image={getImage(author.featuredImage)} />
        </Link>
      </AuthorBlockImage>

      <AuthorBlockParagraph>
        <AuthorBlockName>
          <Link to={`/hubert/authors/${author.slug}`} aria-label="Author">
            {author.fullName}
          </Link>
        </AuthorBlockName>
        <div>
          <AuthorBlockDescription>
            {author.details.details}
            <ReadMore>
              <Link
                to={`/hubert/authors/${author.slug}`}
                aria-label="Read more"
              >
                Mehr
              </Link>
            </ReadMore>
          </AuthorBlockDescription>
        </div>
      </AuthorBlockParagraph>
    </AuthorBlockWrapper>
  </AuthorBlockWidget>
)

const AuthorBlockWidget = styled.div`
  @media (min-width: 768px) {
    margin: 30px 0 60px;
    color: #9d958e;
    text-transform: uppercase;
    font-size: 0.875rem;
    text-align: center;
    padding-left: 77px;
    padding-right: 233px;
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
const StyledGatsbyImage = styled(GatsbyImage)`
  float: left;
  border-radius: 50%;
  margin: 0;
`
const AuthorBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    display: flex !important;
    align-items: center !important;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }
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
`
const AuthorBlockName = styled.div`
  a {
    color: #756b62;
    font-weight: 700;
  }
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
`
const AuthorBlockParagraph = styled.div`
  font-family: Merriweather;
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
  text-align: center;
  @media (min-width: 768px) {
    text-align: left;
  }
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
