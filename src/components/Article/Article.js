import React from "react"
import styled from "styled-components"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

export const Article = ({ content }) => {
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const img = content.references.find(i => {
          return i.contentful_id === node.data.target.sys.id
        })
        return <GatsbyImage image={getImage(img)} alt={img.description} />
      },
    },
  }
  return (
    <Wrapper>
      {documentToReactComponents(JSON.parse(content.raw), richTextOptions)}
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    width: 720px;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    width: 960px;
    max-width: 100%;
  }

  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
  }

  color: #756b62;

  h1,
  h2 {
    text-transform: uppercase;
  }

  a {
    color: #0275d8;
    text-decoration: none;

    :hover {
      color: #014c8c;
      text-decoration: underline;
    }
  }

  @media (min-width: 992px) {
    padding-left: 77px;
    padding-right: 233px;
  }

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }

  .gatsby-image-wrapper {
    margin-left: 0;
    margin-right: 0;
    width: 500px;
    height: 500px;
    vertical-align: middle;
    border-style: none;
    float: left !important;
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
`
