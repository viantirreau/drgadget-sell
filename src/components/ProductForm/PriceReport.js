import React from 'react'
import {
  Transition,
  Header,
  Popup,
  Label,
  Icon,
  Button,
  Table,
} from 'semantic-ui-react'
import formatCurrency from '../../utils/formatCurrency'

function PriceReport({showPrice, price, marketPrice, repairs, repairPrice}) {
  const repairDetailTable = Object.entries(repairs).map(([piece, price]) => {
    return (
      <Table.Row>
        <Table.Cell>{piece}</Table.Cell>
        <Table.Cell>{formatCurrency(price)}</Table.Cell>
      </Table.Row>
    )
  })
  let repairElem = ''
  if (Object.keys(repairs).length > 0) {
    repairElem = (
      <div>
        <Header
          style={{marginBottom: '0', paddingBottom: '0', paddingTop: '1.5em'}}
        >
          Precio reparaciones
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
              <Table>
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
            position="top center"
          />
        </Header>
      </div>
    )
  }
  return (
    <Transition
      visible={showPrice === true}
      unmountOnHide
      animation="fade down"
      duration="800"
    >
      <div>
        <Header>Precio de retoma</Header>
        <Header
          as="h2"
          style={{marginTop: '0', paddingTop: '0', fontWeight: '400'}}
        >
          {formatCurrency(price)}
        </Header>
        <Header style={{marginBottom: '0', paddingBottom: '0'}}>
          Precio de mercado
        </Header>
        <Header
          as="h4"
          style={{marginTop: '0', paddingTop: '0', fontWeight: '400'}}
        >
          En buen estado
        </Header>
        <Header as="h2" style={{margin: '0', padding: '0', fontWeight: '400'}}>
          {formatCurrency(marketPrice)}
        </Header>
        {repairElem}
      </div>
    </Transition>
  )
}

export default PriceReport
