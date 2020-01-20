import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      allSlugsCsv {
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
                ...GatsbyImageSharpFluid
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
  `)

  const siteTitle = get(data, 'site.siteMetadata.title')
  // Object of available slugs. {slug: model}
  const slugs = get(data, 'allSlugsCsv.edges').reduce((obj, edge) => {
    return {
      ...obj,
      [edge.node.slug]: edge.node.model,
    }
  }, {})
  // Object of maxPrices. {model: maxPrice}
  const maxPrices = get(data, 'allPricesCsv.edges').reduce((obj, edge) => {
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
  const products = get(data, 'allFile.edges')
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
    <Layout location={location}>
      <SEO title={siteTitle} />
      <Header
        as="h3"
        icon
        textAlign="center"
        style={{
          marginBottom: '2em',
        }}
      >
        <Header.Content
          style={{
            width: '60%',
            margin: '0 auto',
          }}
        ></Header.Content>
      </Header>
      <ProductList products={products} />
    </Layout>
  )
}

export default StoreIndex
