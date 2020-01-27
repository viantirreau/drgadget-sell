import React from 'react'
import {Link} from 'gatsby'
import {Segment, Container, Grid, List, Header} from 'semantic-ui-react'
import footerStyles from './footer.module.css'
import {graphql, useStaticQuery} from 'gatsby'
import {OutboundLink} from 'gatsby-plugin-google-analytics'

const instagramLink = (
  <div>
    <span>Instagram </span>
    <a href="https://instagram.com/drgadgetchile/" alt="instagram link">
      @drgadgetchile
    </a>
  </div>
)
// const facebookLink = (
//   <a href="https://facebook.com/" alt="facebook link">
//     Facebook
//   </a>
// )
// const emailLink = (
//   <a href="mailto:john@doe.com" alt="email link">
//     Email
//   </a>
// )

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterCategoryQuery {
      allSlugsCsv {
        categories: distinct(field: category)
      }
    }
  `)
  return (
    <Segment
      vertical
      style={{
        padding: '4em 0em',
        marginTop: '3em',
        borderTop: '1px solid #f2f2f2',
      }}
    >
      <Container text>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header as="h4" content="Dr. Gadget" />
              <List>
                <List.Item>
                  <OutboundLink href="https://drgadgetchile.cl/collections/iphones-reacondicionados">
                    Tienda
                  </OutboundLink>
                </List.Item>
                <List.Item>
                  <OutboundLink href="https://drgadgetchile.cl/pages/servicio-tecnico">
                    Servicio técnico
                  </OutboundLink>
                </List.Item>
                <List.Item>
                  <OutboundLink href="https://drgadgetchile.cl/collections/accesorios">
                    Accesorios
                  </OutboundLink>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header as="h4" content="Categorías" />
              <List>
                {data.allSlugsCsv.categories.map((category, index) => {
                  return (
                    <List.Item
                      as={Link}
                      to={`/category/${category.toLowerCase()}`}
                      key={index}
                    >
                      {category}
                    </List.Item>
                  )
                })}
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4">Recicla | Reusa | Reduce</Header>
              <p>
                Dr. Gadget recicla, repara y vende aparatos tecnológicos tales
                como notebooks, tablets y teléfonos móviles, para que así puedan
                ser reutilizados y no se transformen en basura electrónica.
              </p>
              <List horizontal style={{display: 'flex'}}>
                <List.Item
                  icon="instagram"
                  style={{display: 'flex'}}
                  content={instagramLink}
                  className={footerStyles.icon}
                />
                {/* <List.Item
                icon="facebook"
                style={{display: 'flex'}}
                content={facebookLink}
              />
              <List.Item
                icon="mail"
                style={{display: 'flex'}}
                content={emailLink}
              /> */}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}
export default Footer
