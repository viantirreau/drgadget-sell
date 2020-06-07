import React from 'react'
import {Image} from 'semantic-ui-react'

import logo from '../../images/tecnicall.png'

const Logo = () => (
  <Image
    size="small"
    src={logo}
    style={{marginRight: '1.5em'}}
    alt="Tecnicall"
  />
)

export default Logo
