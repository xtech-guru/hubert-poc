const static_data = require(`./src/mocks/articles`)
const authors = require(`./src/mocks/authors`)
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
      allContentfulArticle {
        nodes {
          title
          introduction
          slug
          featuredImage {
            fluid {
              src
            }
            title
          }
          content {
            raw
            references {
              contentful_id
              fluid {
                src
              }
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
              fluid {
                src
              }
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
            fluid {
              src
            }
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

function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;"
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------"
  const p = new RegExp(a.split("").join("|"), "g")

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
}
