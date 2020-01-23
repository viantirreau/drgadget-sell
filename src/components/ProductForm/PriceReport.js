import React from 'react'
import {
  Transition,
  Header,
  Popup,
  Label,
  Icon,
  Button,
  Table,
  Grid,
} from 'semantic-ui-react'
import formatCurrency from '../../utils/formatCurrency'
import MailModal from './MailModal'

function PriceReport({
  showPrice,
  price,
  marketPrice,
  repairs,
  repairPrice,
  hasFailure,
}) {
  const repairDetailTable = Object.entries(repairs).map(([piece, price]) => {
    return (
      <Table.Row>
        <Table.Cell>{piece}</Table.Cell>
        <Table.Cell>{formatCurrency(price)}</Table.Cell>
      </Table.Row>
    )
  })
  let repairElem = ''
  if (hasFailure) {
    repairElem = (
      <Grid.Column width={6}>
        <Header style={{marginBottom: '0', paddingBottom: '0'}}>
          Precio de reparación
        </Header>
        <Header
          as="h4"
          style={{marginTop: '0', paddingTop: '0', fontWeight: '400'}}
        >
          En Dr. Gadget
        </Header>
        <Header as="h2" style={{margin: '0', padding: '0', fontWeight: '400'}}>
          {formatCurrency(repairPrice)}
          <Popup
            trigger={
              <Label as="a" circular>
                <Icon
                  name="info circle"
                  size="large"
                  style={{margin: 0, padding: 0}}
                ></Icon>
              </Label>
            }
            content={
              <Table celled unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Repuesto</Table.HeaderCell>
                    <Table.HeaderCell>Precio</Table.HeaderCell>
                  </Table.Row>
                  {repairDetailTable}
                </Table.Header>
                <Table.Body></Table.Body>
              </Table>
            }
            on="click"
            position="top right"
            size="large"
            offset="25%p"
            basic
          />
        </Header>
        <MailModal
          trigger={
            <Button icon labelPosition="right" style={{marginTop: '1em'}}>
              Lo quiero reparar
              <Icon name="right arrow" />
            </Button>
          }
          message="Repara tu celular"
          actionVerb="reparar tu celular"
        />
      </Grid.Column>
    )
  }

  return (
    <Transition
      visible={showPrice === true}
      unmountOnHide
      animation="fade down"
      duration="800"
    >
      <Grid
        stackable
        divided
        relaxed
        columns="equal"
        style={{marginTop: '1em'}}
      >
        <Grid.Row>
          <Grid.Column>
            <Header style={{marginBottom: '0', paddingBottom: '0'}}>
              Precio de retoma
            </Header>
            <Header
              as="h4"
              style={{marginTop: '0', paddingTop: '0', fontWeight: '400'}}
            >
              En Dr. Gadget
            </Header>
            <Header
              as="h2"
              style={{marginTop: '0', paddingTop: '0', fontWeight: '400'}}
            >
              {formatCurrency(price)}
            </Header>
            <Button icon labelPosition="right">
              Lo quiero vender
              <Icon name="right arrow" />
            </Button>
          </Grid.Column>
          {repairElem}
          <Grid.Column>
            <Header style={{marginBottom: '0', paddingBottom: '0'}}>
              Precio de mercado
            </Header>
            <Header
              as="h4"
              style={{marginTop: '0', paddingTop: '0', fontWeight: '400'}}
            >
              En buen estado
            </Header>
            <Header
              as="h2"
              style={{margin: '0', padding: '0', fontWeight: '400'}}
            >
              {formatCurrency(marketPrice)}
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Transition>
  )
}

export default PriceReport
