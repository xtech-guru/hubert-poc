import React from "react"
import styled from "styled-components"

export const AuthorBlock = ({ author }) => (
  <AuthorBlockWidget>
    <AuthorBlockWrapper>
      <AuthorBlockImage>
        <a href={author.link} rel="author">
          <img src={author.avatar} />
        </a>
      </AuthorBlockImage>

      <AuthorBlockParagraph>
        <AuthorBlockName>
          <a href={author.link} rel="author">
            {author.name}
          </a>
        </AuthorBlockName>
        <div>
          <AuthorBlockDescription>
            {author.description}
            <ReadMore>
              <a href={author.link} rel="author">
                Mehr
              </a>
            </ReadMore>
          </AuthorBlockDescription>
        </div>
      </AuthorBlockParagraph>
    </AuthorBlockWrapper>
  </AuthorBlockWidget>
)

const AuthorBlockWidget = styled.div`
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

const AuthorBlockWrapper = styled.div`
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
