import React from "react"

import * as styles from "./CategoryTemplate.module.scss"
import { Layout, Posts } from "../../components"

const CategoryTemplate = ({ pageContext }) => {
  const { title, relatedArticles } = pageContext.data

  return (
    <Layout seo={title}>
      <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <div>{relatedArticles && <Posts data={relatedArticles} />}</div>
      </div>
    </Layout>
  )
}

export default CategoryTemplate
