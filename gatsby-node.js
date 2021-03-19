const path = require(`path`)
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Create articles pages
  const result = await graphql(`
    query {
      allContentfulCategory {
        nodes {
          slug
          title
          relatedArticles: article {
            title
            introduction
            featuredImage {
              gatsbyImageData
            }
          }
        }
      }
      allContentfulArticle {
        nodes {
          title
          introduction
          slug
          featuredImage {
            gatsbyImageData
            title
          }
          content {
            raw
            references {
              contentful_id
              gatsbyImageData
            }
          }
          category {
            title
            slug
          }
          author {
            fullName
            slug
            details {
              details
            }
            featuredImage: picture {
              gatsbyImageData
            }
          }
          crossLink {
            introduction
            slug
            featuredImage {
              gatsbyImageData
            }
          }
        }
      }
      allContentfulAuthor {
        nodes {
          fullName
          details {
            details
          }
          slug
          featuredImage: picture {
            gatsbyImageData(width: 125)
          }
          wrottenArticles: article {
            title
            slug
          }
        }
      }
    }
  `)

  const articles_list = result.data.allContentfulArticle.nodes
  articles_list.map(article => {
    createPage({
      path: `/articles/${article.slug}`,
      component: path.resolve(`./src/templates/ArticleTemplate.js`),
      context: { data: article },
    })

    const categories_list = result.data.allContentfulCategory.nodes
    categories_list.map(category => {
      createPage({
        path: `/categories/${category.slug}`,
        component: path.resolve(`./src/templates/CategoryTemplate.js`),
        context: { data: category },
      })
    })
  })

  const authors_list = result.data.allContentfulAuthor.nodes
  authors_list.map(author => {
    createPage({
      path: `/authors/${author.slug}`,
      component: path.resolve(`./src/templates/AuthorTemplate.js`),
      context: { data: author },
    })
  })
}
