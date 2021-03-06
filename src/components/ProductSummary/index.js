import React from 'react'
import Img from 'gatsby-image'
import currencyFormat from '../../utils/formatCurrency'

import {Item} from 'semantic-ui-react'

export default ({name, maxPrice, mainImage}) => (
  <Item.Group>
    <Item style={{alignItems: 'center', textAlign: 'center'}}>
      <Item.Image size="medium">
        <Img
          style={{width: '250px', marginBottom: '2em'}}
          alt={name}
          fadeIn={true}
          fluid={mainImage.childImageSharp.fluid}
        />
      </Item.Image>
      <Item.Content>
        <Item.Header>{name}</Item.Header>
        <Item.Description>
          <p>Hasta {currencyFormat(maxPrice)}</p>
        </Item.Description>
        <Item.Extra></Item.Extra>
      </Item.Content>
    </Item>
  </Item.Group>
)
