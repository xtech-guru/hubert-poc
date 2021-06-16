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
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 340)
                }
              }
              title
            }
            category {
              slug
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
            localFile {
              childImageSharp {
                gatsbyImageData(width: 1110)
              }
            }
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
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 202
                  breakpoints: [125, 157, 202]
                  sizes: "(max-width: 768px) 125px, (max-width:992px) 157px, 202px"
                )
              }
            }
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
      path: `/hubert/articles/${article.slug}`,
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
        path: `/hubert/categories/${category.slug}`,
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
      path: `/hubert/authors/${author.slug}`,
      component: path.resolve(`./src/templates/AuthorTemplate.js`),
      context: { data: author },
    })
  })
}
