import React from "react"

import { Article, Container, Layout, Seo } from "../components"
import mockData from "../mock/impressum.json"

const AboutPage = props => {
  return (
    <Layout>
      <Seo title="Impressum" />
      <Container>
        <Article header={props.header} content={props.content} />
      </Container>
    </Layout>
  )
}

AboutPage.defaultProps = mockData

export default AboutPage
