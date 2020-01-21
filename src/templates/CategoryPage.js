import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import ProductList from '../components/ProductList'
import {Header} from 'semantic-ui-react'

const CategoryPageTemplate = props => {
  const slugs = props.data.allSlugsCsv.edges.reduce((obj, edge) => {
    return {
      ...obj,
      [edge.node.slug]: edge.node.model,
    }
  }, {})
  // Object of maxPrices. {model: maxPrice}
  const maxPrices = props.data.allPricesCsv.edges.reduce((obj, edge) => {
    return {
      ...obj,
      [edge.node.model]: edge.node.max,
    }
  }, {})

  // Object {slug: {image: childImageSharp, name: model}
  /*
   * Gets all available img files, and filters those whose slug is
   * defined. It creates an object
   **/
  const products = props.data.allFile.edges
    .filter(edge => edge.node.relativeDirectory in slugs)
    .map(edge => {
      let name = slugs[edge.node.relativeDirectory]
      return {
        node: {
          slug: edge.node.relativeDirectory,
          image: edge.node.childImageSharp,
          name: name,
          maxPrice: maxPrices[name],
        },
      }
    })

  return (
    <Layout location={props.location}>
      <Header
        as="h1"
        textAlign="center"
        style={{
          marginBottom: '1em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        >
          Categoría {props.pageContext.category}
        </Header.Content>
      </Header>
      <ProductList products={products} />
    </Layout>
  )
}

export default CategoryPageTemplate

export const pageQuery = graphql`
  query Category($category: String!) {
    allSlugsCsv(filter: {category: {eq: $category}}) {
      edges {
        node {
          model
          slug
        }
      }
    }
    allFile(filter: {sourceInstanceName: {eq: "img"}, name: {eq: "1"}}) {
      edges {
        node {
          relativeDirectory
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    allPricesCsv {
      edges {
        node {
          max
          model
        }
      }
    }
  }
`
