import React from 'react'
import Layout from '../components/Layout'
import {Image, Grid} from 'semantic-ui-react'
import {Link} from 'gatsby'

import img404 from '../images/404drgadget.svg'

const NotFoundPage = ({location}) => (
  <Layout location={location}>
    <Grid textAlign="center">
      <Grid.Column>
        <h1>UPS!</h1>
        <Image
          size="large"
          src={img404}
          style={{margin: '0 auto'}}
          alt="Tecnicall - 404"
        />
        <p>No encontramos esa página :(</p>
        <Link to="/">Volver al inicio</Link>
      </Grid.Column>
    </Grid>
  </Layout>
)

export default NotFoundPage
