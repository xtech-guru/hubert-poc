import React from "react"

import { Article, Container, Layout } from "../components"
import { graphql } from "gatsby"

const AboutPage = ({ data }) => {
  const { title, seo, content } = data.contentfulPage
  return (
    <Layout seo={seo || title}>
      <Container>
        <Article content={content} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulPage(slug: { eq: "about" }) {
      title
      seo
      content {
        raw
        references {
          contentful_id
          gatsbyImageData
          description
        }
      }
    }
  }
`

export default AboutPage
