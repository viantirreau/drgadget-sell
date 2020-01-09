/* eslint-disable */
import React from 'react'
import {graphql} from 'gatsby'
/*
import SEO from '../components/SEO'
import get from 'lodash/get'
import ProductSummary from '../components/ProductSummary'
import ProductAttributes from '../components/ProductAttributes'
import Layout from '../components/Layout'
*/

const ProductPageTemplate = props => {
  const defects = props.data.defectsCsv
  const versions = props.data.allPricesCsv.edges
  return <div></div>
}

export default ProductPageTemplate

export const pageQuery = graphql`
  query ProductsQuery($model: String!) {
    allPricesCsv(filter: {model: {eq: $model}}) {
      edges {
        node {
          storage
          fingerprint
          max
          min
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
  }
`
