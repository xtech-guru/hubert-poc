import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { graphql } from "gatsby"

import * as styles from "../styles/impressum.module.scss"
import { Container, Layout } from "../../components"

const AboutPage = ({ data }) => {
  const { content, title, seo } = data.contentfulPage
  return (
    <Layout seo={seo || title}>
      <Container>
        <article className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {documentToReactComponents(JSON.parse(content.raw))}
        </article>
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
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`

export default AboutPage
