import React, {useState, useEffect} from 'react'
import {Link, withPrefix} from 'gatsby'
import {
  Menu,
  Container,
  Icon,
  Portal,
  Segment,
  Divider,
  Button,
  Header,
} from 'semantic-ui-react'
import styled from 'styled-components'
import Logo from './Logo'
import {graphql, useStaticQuery} from 'gatsby'

const StyledLink = styled(Link)`
  font-weight: bold;
  text-align: center;
  font-size: 2em;
  &:hover {
    text-decoration: underline;
  }
`

const BurgerButton = styled(Button)`
  &&& {
    font-size: 1rem;
    padding: 0.785em 1.5em;
    box-shadow: 0 0 0 1px transparent inset,
      0 0 0 0 rgba(34, 36, 38, 0.15) inset;
  }
`
const CloseButton = styled(BurgerButton)`
  &&& {
    position: absolute;
    top: -4em;
    right: 0em;
    padding: 0.5em;
    font-size: 1.5em;
    width: 2em;
    height: 2em;
  }
`

const StyledSegment = styled(Segment)`
  &&& {
    position: fixed;
    top: -1em;
    left: 0vw;
    z-index: 1000;
    width: 100vw;
    height: 110vh;
  }
`

const StyledContainer = styled.div`
  &&& {
    margin-top: 6em;
    text-align: center;
    position: relative;
  }
`

const StyledDivider = styled(Divider)`
  &&& {
    margin: 2em;
  }
`

const MobileMenu = ({location: {pathname}}) => {
  const [activeItem, setActiveItem] = useState(pathname)
  const [open, setOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query MobileCategoryQuery {
      allSlugsCsv {
        categories: distinct(field: category)
      }
    }
  `)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  const handleClick = () => setOpen(!open)

  const handleClose = () => setOpen(false)

  return (
    <Menu size="huge" borderless pointing>
      <Container text>
        <Menu.Item
          as={Link}
          to="/"
          header
          active={activeItem === withPrefix('/')}
        >
          <Logo />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item position="right">
            <BurgerButton
              basic
              onClick={handleClick}
              aria-label="Abrir menú de navegación"
              autoFocus
            >
              <Icon fitted name="bars" />
            </BurgerButton>
          </Menu.Item>
        </Menu.Menu>
        <Portal closeOnEscape onClose={handleClose} open={open}>
          <StyledSegment
            className
            role="dialog"
            aria-label="Menú de navegación"
          >
            <StyledContainer>
              <CloseButton
                aria-label="Cerrar"
                basic
                circular
                onClick={handleClose}
                autoFocus
              >
                X
              </CloseButton>
              <StyledLink to="/" onClick={handleClose}>
                Inicio
              </StyledLink>
              <StyledDivider />
              <Header
                as="h1"
                textAlign="center"
                style={{
                  marginBottom: '1em',
                }}
              >
                <Header.Content
                  style={{
                    width: '60%',
                    margin: '0 auto',
                  }}
                >
                  Categorías
                </Header.Content>
              </Header>
              {data.allSlugsCsv.categories.map((category, index) => {
                let sep = index > 0 ? <StyledDivider key={index} /> : ''
                return (
                  <div key={index}>
                    {sep}
                    <StyledLink
                      to={`/category/${category.toLowerCase()}`}
                      onClick={handleClose}
                      key={index}
                    >
                      {category}
                    </StyledLink>
                  </div>
                )
              })}
            </StyledContainer>
          </StyledSegment>
        </Portal>
      </Container>
    </Menu>
  )
}

export default MobileMenu
