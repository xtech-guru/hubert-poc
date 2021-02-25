import React from "react"
import styled from "styled-components"

import { Container, Layout, Seo } from "../components"
import mockData from "../mock/about.json"

const ArticleHeader = ({ title, description }) => {
  return (
    <>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </>
  )
}

const ParagraphBlock = ({ title, descriptions = [] }) => {
  return (
    <>
      {title && <h2>{title}</h2>}
      {descriptions.map((description, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: description }} />
      ))}
    </>
  )
}

const Paragraph = ({ paragraph }) => {
  return (
    <>
      {paragraph.blocks.map((block, index) => (
        <ParagraphBlock
          key={index}
          title={block.title}
          descriptions={block.descriptions}
        />
      ))}
    </>
  )
}

const AboutPage = props => {
  return (
    <Layout>
      <Seo title="About" />
      <Container>
        <ArticleWrapper>
          <ArticleContentWrapper>
            <ArticleHeader
              title={props.header.title}
              description={props.header.description}
            />

            <StyledImage {...props.content.image} />

            <Paragraph paragraph={props.content.paragraph} />
          </ArticleContentWrapper>
        </ArticleWrapper>
      </Container>
    </Layout>
  )
}

export default AboutPage

AboutPage.defaultProps = mockData

const StyledImage = styled.img`
  display: block;
  margin-left: 0;
  margin-right: 0;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  border-style: none;

  *,
  :after,
  :before {
    box-sizing: inherit;
  }

  @media (min-width: 768px) {
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: -63px;
    float: left !important;
  }

  @media (min-width: 992px) {
    margin-left: -77px;
  }
`

const ArticleWrapper = styled.article`
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
    width: 960px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  box-sizing: inherit;
`

const ArticleContentWrapper = styled.div`
  display: block;
  margin: 0 0 20px;
  color: #756b62;

  * {
    box-sizing: inherit;
  }

  @media (min-width: 992px) {
    padding-left: 77px;
    padding-right: 233px;
  }

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`
