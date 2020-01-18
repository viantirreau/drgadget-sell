/* eslint-disable camelcase */
import React from 'react'
import {Card, Image} from 'semantic-ui-react'
import Img from 'gatsby-image'
import {Link} from 'gatsby'
import formatCurrency from '../../utils/formatCurrency'

const mapProductsToItems = products =>
  products.map(({node: {slug, image, name, maxPrice}}) => {
    const price = maxPrice || null
    const willReturn = {
      as: Link,
      to: `/${slug}/`,
      childKey: slug,
      image: (
        <Image>
          <Img fluid={image.fluid} alt={name} />
        </Image>
      ),
      header: name,
      meta: (
        <Card.Meta style={{color: 'dimgray'}}>
          {`Hasta ${formatCurrency(price)}`}
        </Card.Meta>
      ),
    }
    return willReturn
  })
export default ({products}) => (
  <Card.Group items={mapProductsToItems(products)} itemsPerRow={2} />
)
