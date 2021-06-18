import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./AuthorTemplate.module.scss"
import { Layout } from "../../components"
import back_icon from "../../images/icon_arrow_blue.svg"

const AuthorTemplate = ({ pageContext }) => {
  const { fullName, details, featuredImage, wrottenArticles } = pageContext.data
  //todo: make something for authors that did not have articles
  return (
    <Layout seo={fullName}>
      <div className={styles.container}>
        <Link to="/hubert/about/" aria-label="About" className={styles.link}>
          <img src={back_icon} className={styles.icon} alt="" />
          <span>Zurück zu 'Über uns'</span>
        </Link>
        <h1 className={styles.name}>
          {fullName.substr(0, fullName.indexOf(" "))}
        </h1>
        <div>
          <GatsbyImage
            className={styles.avatar}
            image={getImage(featuredImage?.localFile)}
            alt="Author image"
          />
        </div>
        <p>{details.details}</p>
        <ul>
          <h2>Publizierte Artikel</h2>
          <hr />
          {wrottenArticles?.map(article => {
            return (
              <React.Fragment key={article.slug}>
                <li>
                  <Link
                    to={`/hubert/articles/${article.slug}`}
                    aria-label="Article"
                  >
                    {article.title}
                  </Link>
                </li>
                <hr />
              </React.Fragment>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default AuthorTemplate
