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

const positivePricesObj = raw => {
  return Object.keys(raw)
    .filter(key => raw[key] > 0)
    .reduce((obj, key) => {
      obj[key] = raw[key]
      return obj
    }, {})
}

const ProductPageTemplate = props => {
  const defectsRaw = props.data.defectsCsv
  const defects = positivePricesObj(defectsRaw)
  const repairsRaw = props.data.repairsCsv
  const repairs = positivePricesObj(repairsRaw)

  const defectsDescriptions = props.data.allDefectDescriptionsCsv.edges
    .filter(edge => edge.node.defect in defects)
    .reduce((obj, edge) => {
      return {
        ...obj,
        [edge.node.defect]: edge.node.description,
      }
    }, {})
  const defectsTranslations = props.data.allDefectDescriptionsCsv.edges
    .filter(edge => edge.node.defect in defects)
    .reduce((obj, edge) => {
      return {
        ...obj,
        [edge.node.defect]: edge.node.translation,
      }
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
    defectsTranslations,
    repairs,
    storageCapacities,
    versions,
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
          translation
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
      loudspeaker
      motherboard
    }
    repairsCsv(model: {eq: $model}) {
      backcam
      battery
      charger
      chassis
      earspeaker
      frontcam
      glass
      home
      screen
      loudspeaker
      motherboard
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
