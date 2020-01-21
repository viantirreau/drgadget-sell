import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
import {Menu, Container} from 'semantic-ui-react'
import Logo from './Logo'
import {graphql, useStaticQuery} from 'gatsby'

const DesktopMenu = ({location: {pathname}}) => {
  const [activeItem, setActiveItem] = useState(pathname)
  const data = useStaticQuery(graphql`
    query CategoryQuery {
      allSlugsCsv {
        categories: distinct(field: category)
      }
    }
  `)

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
          {data.allSlugsCsv.categories.map(category => {
            return (
              <Menu.Item
                as={Link}
                to={`/category/${category.toLowerCase()}`}
                active={
                  activeItem ===
                  withPrefix(`/category/${category.toLowerCase()}`)
                }
              >
                {category}
              </Menu.Item>
            )
          })}
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default DesktopMenu
