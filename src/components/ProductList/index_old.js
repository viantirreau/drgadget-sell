/* eslint-disable camelcase */
import React from 'react'
import {Card, Image, Grid} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'

const mapProductsToItems = products =>
  products.map(({node: {name, id, meta, mainImage}}) => {
    const price = meta.display_price.with_tax.formatted || null
    const willReturn = {
      as: Link,
      to: `/product/${id}/`,
      childKey: id,
      image: (
        <Image>
          <Img fluid={mainImage.childImageSharp.fluid} alt={name} />
        </Image>
      ),
      header: name,
      meta: <Card.Meta style={{color: 'dimgray'}}>{price}</Card.Meta>,
    }
    console.log(willReturn)
    return willReturn
  })

export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} />
)
