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
  const articles_data = static_data[0]
  const { title } = articles_data.article.header
  const title_slug = slugify(title)
  await createPage({
    path: `/articles/${title_slug}`,
    component: path.resolve(`./src/templates/ArticleTemplate.js`),
    context: { data: articles_data },
  })
  // Create authors pages
  const authors_data = authors[0]
  const { name } = authors_data.author
  const name_slug = slugify(name)
  await createPage({
    path: `/authors/${name_slug}`,
    component: path.resolve(`./src/templates/AuthorTemplate.js`),
    context: { data: authors_data },
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
