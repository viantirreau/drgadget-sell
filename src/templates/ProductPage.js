import React from 'react'
import {graphql} from 'gatsby'
import ProductSummary from '../components/ProductSummary'
import Layout from '../components/Layout'
import ProductForm from '../components/ProductForm'

/*
import SEO from '../components/SEO'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'
*/

const ProductPageTemplate = props => {
  const defectsRaw = props.data.defectsCsv
  const defects = Object.keys(defectsRaw)
    .filter(key => defectsRaw[key] > 0)
    .reduce((obj, key) => {
      obj[key] = defectsRaw[key]
      return obj
    }, {})
  const defectsDescriptions = props.data.allDefectDescriptionsCsv.edges
    .filter(edge => edge.node.defect in defects)
    .reduce((obj, edge) => {
      return {...obj, [edge.node.defect]: edge.node.description}
    }, {})
  const versions = props.data.allPricesCsv.edges
  const storageCapacities = versions.map(edge => edge.node.storage)
  const maxPrice = Math.max(...versions.map(edge => edge.node.max))
  const images = props.data.allFile.edges
  const firstImage = images[0].node
  const product = {
    name: props.pageContext.model,
    maxPrice,
    mainImage: firstImage,
  }
  const productAttributes = {
    defects,
    defectsDescriptions,
    versions,
    storageCapacities,
  }

  return (
    <Layout location={props.location}>
      <ProductSummary {...product}></ProductSummary>
      <ProductForm {...productAttributes} />
    </Layout>
  )
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($model: String!, $slug: String!) {
    allPricesCsv(filter: {model: {eq: $model}}) {
      edges {
        node {
          storage
          fingerprint
          max
          min
          market
        }
      }
    }
    allDefectDescriptionsCsv {
      edges {
        node {
          defect
          description
        }
      }
    }
    defectsCsv(model: {eq: $model}) {
      backcam
      battery
      charger
      chassis
      earspeaker
      frontcam
      glass
      home
      screen
    }
    allFile(
      filter: {relativeDirectory: {eq: $slug}, sourceInstanceName: {eq: "img"}}
    ) {
      edges {
        node {
          name
          publicURL
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
