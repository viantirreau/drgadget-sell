const path = require('path')

module.exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve('src/templates/ProductPage.js')
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
      }),
    )
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    node: {fs: 'empty'},
  })
}
