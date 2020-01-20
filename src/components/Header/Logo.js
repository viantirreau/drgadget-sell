import React from 'react'
import {Image} from 'semantic-ui-react'

import logo from '../../images/drgadget.png'

const Logo = () => (
  <Image
    size="small"
    src={logo}
    style={{marginRight: '1.5em'}}
    alt="Dr Gadget"
  />
)

export default Logo
