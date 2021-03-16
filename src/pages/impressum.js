import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { graphql } from "gatsby"
import styled from "styled-components"

import { Container, Layout } from "../components"

const AboutPage = ({ data }) => {
  const { content, title, seo } = data.contentfulPage
  return (
    <Layout seo={seo || title}>
      <Container>
        <ContentWrapper>
          <Title>{title}</Title>
          {documentToReactComponents(JSON.parse(content.raw))}
        </ContentWrapper>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulPage(slug: { eq: "impressum" }) {
      title
      seo
      content {
        raw
        references {
          gatsbyImageData
        }
      }
    }
  }
`
const Title = styled.h1`
  color: #0275d8 !important;
  text-decoration: none !important;
  touch-action: manipulation !important;
  cursor: pointer;
  &:hover {
    color: #014c8c !important;
    text-decoration: underline !important;
  }
`
const ContentWrapper = styled.article`
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;

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

  & div {
    margin: 0 0 20px;
    color: #756b62;

    @media (min-width: 992px) {
      padding-left: 77px;
      padding-right: 233px;
    }

    @media (min-width: 768px) {
      margin-bottom: 30px;
    }

    & img {
      margin-left: 0;
      margin-right: 0;
      max-width: 100%;
      height: auto;
      vertical-align: middle;
      border-style: none;

      @media (min-width: 768px) {
        margin-bottom: 20px;
        margin-right: 30px;
        margin-left: -63px;
        float: left !important;
      }

      @media (min-width: 992px) {
        margin-left: -77px;
      }
    }
  }
`
export default AboutPage
