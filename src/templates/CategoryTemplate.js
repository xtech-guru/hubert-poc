import React from "react"
import { Layout, Posts } from "../components"
import styled from "styled-components"

const CategoryTemplate = ({ pageContext }) => {
  const { category } = pageContext.data
  const data = category.articles.map(article => ({
    ...article,
    categories: [{ ...article.category }],
  }))
  return (
    <Layout>
      <PageWrapper>
        <CategoryTitle>{category.title}</CategoryTitle>
        <ArticlesWrapper>
          <Posts data={data} />
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
    @media (min-width: 576px) {
      padding-right: 30px;
      padding-bottom: 61px;
      width: 33.333%;
    }
  }
`
const CategoryTitle = styled.h2`
  color: #4b3e31;
  margin-bottom: 70px;
  font-size: 3rem;
  text-align: center !important;
  text-transform: uppercase;
  @media (min-width: 992px) {
    font-size: 1.75rem;
  }
`
export default CategoryTemplate
