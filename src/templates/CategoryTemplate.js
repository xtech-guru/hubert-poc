import React from "react"
import { Layout, Posts } from "../components"
import styled from "styled-components"

const CategoryTemplate = ({ pageContext }) => {
  const { title, relatedArticles } = pageContext.data
  const articles = relatedArticles?.map(item => ({
    ...item,
    category: {
      title,
    },
  }))

  return (
    <Layout seo={title}>
      <PageWrapper>
        <CategoryTitle>{title}</CategoryTitle>
        <ArticlesWrapper>
          {articles && <Posts data={articles} />}
        </ArticlesWrapper>
      </PageWrapper>
    </Layout>
  )
}

const PageWrapper = styled.div`
  margin-top: 60px;
`
const ArticlesWrapper = styled.div`
  @media (min-width: 992px) {
    margin-top: 1.3125rem;
    padding: 0px 14px;
  }
  .grid-item {
    border: 1px solid red;
    padding-bottom: 41px;
    border: none;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    @media (min-width: 992px) {
      padding-right: 30px;
      padding-bottom: 61px;
      width: 33.333%;
    }
  }
`
const CategoryTitle = styled.h2`
  margin-bottom: 60px;
  font-size: 2rem;
  color: #4b3e31;
  text-align: center !important;

  @media (min-width: 768px) {
    margin-bottom: 70px;
    font-size: 2.5rem;
  }

  @media (min-width: 992px) {
    font-size: 3rem;
  }
`

export default CategoryTemplate
