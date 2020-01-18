import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
import {Menu, Container} from 'semantic-ui-react'
import Logo from './Logo'

const DesktopMenu = ({location: {pathname}}) => {
  const [activeItem, setActiveItem] = useState(pathname)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  return (
    <Menu size="huge" borderless pointing>
      <Container text>
        <Menu.Item
          active={activeItem === withPrefix('/')}
          as={Link}
          to="/"
          header
        >
          <Logo />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/register/"
            active={activeItem === withPrefix('/register/')}
          >
            Sign up
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/login/"
            active={activeItem === withPrefix('/login/')}
          >
            Sign in
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default DesktopMenu
