import React from 'react'
import {Responsive} from 'semantic-ui-react'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'

const Header = ({location}) => {
  return (
    <>
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <MobileMenu location={location} />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <DesktopMenu location={location} />
      </Responsive>
    </>
  )
}

export default Header
