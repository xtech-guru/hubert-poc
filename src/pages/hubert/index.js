import React from "react"
import { graphql, Link } from "gatsby"

import * as styles from "../styles/index.module.scss"
import { Layout, Posts } from "../../components"

import icon_arrow_blue from "../../images/icon_arrow_blue.svg"
import icon_arrow_brown from "../../images/icon_arrow_brown.svg"

const IndexPage = ({ data }) => {
  const featuredArticle = data.contentfulMainArticle.mainArticle
  const articles = data.allContentfulArticle.nodes.filter(
    item => item?.slug !== featuredArticle?.slug
  )
  return (
    <Layout seo="Hubert">
      <div className={styles.container}>
        {featuredArticle && (
          <article
            style={{
              backgroundImage: `url(${featuredArticle.featuredImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src})`,
            }}
            className={styles.article}
          >
            <div>
              <div>
                <Link
                  to={`/hubert/categories/${featuredArticle.category.slug}`}
                  aria-label="Category"
                >
                  {featuredArticle.category.title}
                </Link>
              </div>
              <div>
                <Link
                  to={`/hubert/articles/${featuredArticle.slug}`}
                  aria-label="Link"
                >
                  {featuredArticle.title}
                </Link>
              </div>
              <p className={styles.introduction}>
                {featuredArticle.introduction.introduction}
              </p>
              <Link
                to={`/hubert/articles/${featuredArticle.slug}`}
                aria-label="Home"
              >
                <img src={icon_arrow_blue} alt="" width={37} height={35} />
                <img src={icon_arrow_brown} alt="" width={36} height={31} />
              </Link>
            </div>
          </article>
        )}
        <Posts data={articles} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulArticle(
      filter: { node_locale: { eq: "en-US" } }
      sort: { order: ASC, fields: createdAt }
    ) {
      nodes {
        title
        introduction {
          introduction
          childMarkdownRemark {
            html
          }
        }
        slug
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData(
                breakpoints: [280, 315, 340, 500]
                sizes: "(max-width: 768px) 500px, (max-width:992px) 315px, (max-width: 1199px) 280px, 340px"
              )
            }
          }
          title
        }
        category {
          title
          slug
        }
      }
    }
    contentfulMainArticle {
      mainArticle {
        title
        introduction {
          introduction
          childMarkdownRemark {
            html
          }
        }
        slug
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          title
        }
        category {
          title
          slug
        }
      }
    }
  }
`

export default IndexPage
