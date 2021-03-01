import React from "react"

import { Article, Container, Layout, SEO } from "../components"
import mockData from "../mock/impressum.json"

const AboutPage = props => {
  return (
    <Layout>
      <SEO title="Impressum" />
      <Container>
        <Article header={props.header} content={props.content} />
      </Container>
    </Layout>
  )
}

AboutPage.defaultProps = mockData

export default AboutPage
