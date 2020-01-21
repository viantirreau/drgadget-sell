const path = require('path')

module.exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions
  // https://swas.io/blog/using-multiple-queries-on-gatsbyjs-createpages-node-api/
  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/ProductPage.js')
    const categoryPageTemplate = path.resolve('src/templates/CategoryPage.js')
    resolve(
      graphql(
        `
          {
            allSlugsCsv {
              edges {
                node {
                  model
                  slug
                }
              }
              categories: distinct(field: category)
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allSlugsCsv.edges.forEach(edge => {
          createPage({
            path: `/${edge.node.slug}/`,
            component: productPageTemplate,
            context: {
              slug: edge.node.slug,
              model: edge.node.model,
            },
          })
        })
        result.data.allSlugsCsv.categories.forEach(category => {
          createPage({
            path: `/category/${category.toLowerCase()}/`,
            component: categoryPageTemplate,
            context: {
              category,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    node: {fs: 'empty'},
    output: {
      // e.g. app-2e49587d85e03a033f58.js
      filename: `[name]-[contenthash].js`,
      // e.g. component---src-blog-2-js-cebc3ae7596cbb5b0951.js
      chunkFilename: `[name]-[contenthash].js`,
      path: `/public`,
      publicPath: `/`,
    },
    target: `web`,
    mode: `production`,
  })
}
