import React from "react"

import { Article, Container, Layout, SEO } from "../components"
import { graphql } from "gatsby"

const AboutPage = ({ data }) => {
  const { content } = data.allContentfulPage.nodes[0]
  return (
    <Layout>
      <SEO title="About" />
      <Container>
        <Article content={content} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulPage(filter: { title: { eq: "About" } }) {
      nodes {
        content {
          raw
          references {
            contentful_id
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default AboutPage
