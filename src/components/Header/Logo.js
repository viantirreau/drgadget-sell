import React from 'react'
import {Image} from 'semantic-ui-react'

import moltin from '../../images/drgadget.png'

const Logo = () => (
  <Image
    size="small"
    src={moltin}
    style={{marginRight: '1.5em'}}
    alt="Dr Gadget"
  />
)

export default Logo
