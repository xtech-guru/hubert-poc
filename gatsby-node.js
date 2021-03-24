const path = require(`path`)
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  // Create articles pages
  // TODO: pass the slug and let the work be done in just one place (the template)
  const result = await graphql(`
    query {
      allContentfulCategory {
        nodes {
          slug
          title
          relatedArticles: article {
            slug
            title
            createdAt
            introduction {
              childMarkdownRemark {
                html
              }
            }
            featuredImage {
              gatsbyImageData(formats: [WEBP])
              title
            }
          }
        }
      }
      allContentfulArticle {
        nodes {
          title
          introduction {
            childMarkdownRemark {
              html
            }
          }
          slug
          featuredImage {
            gatsbyImageData(formats: [WEBP])
            title
          }
          content {
            childMarkdownRemark {
              html
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
              gatsbyImageData(formats: [WEBP], width: 96)
            }
          }
          crossLink {
            introduction
            slug
            featuredImage {
              gatsbyImageData(formats: [WEBP])
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
            gatsbyImageData(width: 125, formats: [WEBP])
          }
          wrottenArticles: article {
            slug
            title
            createdAt
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
    //Sort articles in the category by field createdAt
    for (const category of categories_list) {
      category &&
        category.relatedArticles &&
        category.relatedArticles.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        )
    }

    categories_list.map(category => {
      createPage({
        path: `/categories/${category.slug}`,
        component: path.resolve(`./src/templates/CategoryTemplate.js`),
        context: { data: category },
      })
    })
  })

  const authors_list = result.data.allContentfulAuthor.nodes

  //Sort articles in the author by field createdAt
  for (const author of authors_list) {
    author &&
      author.wrottenArticles &&
      author.wrottenArticles.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      )
  }

  authors_list.map(author => {
    createPage({
      path: `/authors/${author.slug}`,
      component: path.resolve(`./src/templates/AuthorTemplate.js`),
      context: { data: author },
    })
  })
}
