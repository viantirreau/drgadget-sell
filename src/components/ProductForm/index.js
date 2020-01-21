/* eslint-disable camelcase */
/*eslint max-len: ["error", { "code": 110 }]*/
import React from 'react'
import {
  Form,
  Divider,
  Button,
  Icon,
  Label,
  Transition,
  Grid,
  Message,
  Header,
  Popup,
} from 'semantic-ui-react'
import formStyles from './form.module.css'
import formatCurrency from '../../utils/formatCurrency'

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.defects = props.defects
    this.defectsDescriptions = props.defectsDescriptions
    this.storageCapacities = props.storageCapacities
    this.versions = props.versions
    this.failures = {}
    this.failureReasons = {}
    this.formErrors = []
  }
  // Set initial state here
  state = {
    failuresArray: [],
    failureReasonsArray: [],
    error: false,
    triedToSubmit: false,
    showPrice: false,
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  /*
   Form state-preserving method, i.e. when a button causes the parent component to
   hide and unmount after the field using this handler as callback was filled, the answers are preserved 
   if the parent is mounted and gets visible again.
  */
  handleFailureChange = (e, {name, checked}) => {
    this.failures[name] = checked
    let failuresArray = Object.keys(this.failures).filter(
      key => this.failures[key] === true,
    )
    /* It's mandatory to call setState somehow in every state change. Class attributes (object properties)
       do not trigger re-rendering, so the component won't be updated in the DOM.
    */
    this.setState({failuresArray})
  }
  // Form state-preserving method
  handleFailureReasonsChange = (e, {name, checked}) => {
    this.failureReasons[name] = checked
    let failureReasonsArray = Object.keys(this.failureReasons).filter(
      key => this.failureReasons[key] === true,
    )
    this.setState({failureReasonsArray})
  }
  // Form state-preserving method
  handleTechServiceDiagnosis = (e, {value}) =>
    this.setState({techServiceDiagnosis: value})

  handleSubmit = e => {
    let hasError =
      this.state.storage == undefined ||
      this.state.hasFailure == undefined ||
      (this.state.hasFailure && this.state.failuresArray.length === 0) ||
      (this.state.hasFailure && this.state.failureReasonsArray.length === 0) ||
      this.state.techService == undefined ||
      (this.state.techService &&
        this.state.techServiceDiagnosis == undefined) ||
      (this.state.techService && this.state.techServiceDiagnosis === '')

    this.setState({
      error: hasError,
      triedToSubmit: true,
      showPrice: false,
    })
    this.formErrors = []
    if (this.state.storage == undefined) {
      this.formErrors.push('Selecciona el almacenamiento de tu celular')
    }
    if (this.state.hasFailure == undefined) {
      this.formErrors.push('Selecciona si tu equipo presenta fallas')
    }
    if (this.state.hasFailure && this.state.failuresArray.length === 0) {
      this.formErrors.push('Elige al menos una falla de la lista')
    }
    if (this.state.hasFailure && this.state.failureReasonsArray.length === 0) {
      this.formErrors.push('Elige al menos una causa para las fallas')
    }
    if (this.state.techService == undefined) {
      this.formErrors.push(
        'Selecciona si has llevado tu equipo al servicio técnico',
      )
    }
    if (this.state.techService) {
      if (
        this.state.techServiceDiagnosis == undefined ||
        this.state.techServiceDiagnosis === ''
      ) {
        this.formErrors.push('Incluye el diagnóstico del servicio técnico')
      }
    }
    if (!hasError) {
      let model = Object.values(this.versions).filter(
        edge => edge.node.storage == this.state.storage,
      )[0].node
      let basePrice = model.max
      let discounts = 0
      this.state.failuresArray.forEach(discount => {
        discounts += this.defects[discount]
      })
      let buyPrice = Math.max(model.min, basePrice - discounts)
      this.setState({
        showPrice: true,
        price: buyPrice,
        marketPrice: model.market,
      })
    }
  }

  render() {
    const {storage, hasFailure, showPrice} = this.state
    return (
      <Form size="big">
        <Form.Field>
          <label>Almacenamiento</label>
          {this.storageCapacities.map(option => (
            <Button
              inverted
              color="green"
              name="storage"
              onClick={this.handleChange}
              active={storage === option}
              key={option}
              value={option}
              size="big"
              className={formStyles.button}
            >
              {`${option} GB`}
            </Button>
          ))}
        </Form.Field>
        <Form.Field>
          <label>¿Tu teléfono tiene alguna falla?</label>
          <Button
            inverted
            color="green"
            name="hasFailure"
            value={false}
            onClick={this.handleChange}
            active={hasFailure === false}
            className={formStyles.button}
            key="perfect"
          >
            No, está en perfecto estado
          </Button>
          <Button
            inverted
            color="green"
            value={true}
            name="hasFailure"
            onClick={this.handleChange}
            active={hasFailure === true}
            className={formStyles.button}
            key="fails"
          >
            Sí, tiene algunos detalles
          </Button>
        </Form.Field>
        <Transition
          animation="fade up"
          duration="300"
          visible={this.state.hasFailure === true}
          unmountOnHide
        >
          <Form.Group grouped>
            <Form.Field>
              <label>Selecciona las fallas de tu equipo</label>
              {/* screen,battery,charger,home,backcam,frontcam,earspeaker,loudspeaker,glass,chassis */}
              {Object.entries(this.defectsDescriptions).map(
                ([defect, description]) => {
                  return (
                    <Form.Checkbox
                      label={description}
                      name={defect}
                      onChange={this.handleFailureChange}
                      key={defect}
                      /* This preserves the form state when hasFailure is toggled
                         and the Transition is hidden and then unmounted. When it is
                         active again, the answers will remain the same as before.
                      */
                      checked={this.state.failuresArray.includes(defect)}
                    />
                  )
                },
              )}
            </Form.Field>
            <Form.Field>
              <label>
                Selecciona los posibles factores que causaron
                {this.state.failuresArray.length > 1
                  ? ' las fallas'
                  : ' la falla'}
              </label>
              <Form.Checkbox
                label="Se cayó al agua"
                name="water"
                onChange={this.handleFailureReasonsChange}
                checked={this.state.failureReasonsArray.includes('water')}
                key="water"
              />
              <Form.Checkbox
                label="Se golpeó contra el suelo"
                name="crash"
                onChange={this.handleFailureReasonsChange}
                checked={this.state.failureReasonsArray.includes('crash')}
                key="crash"
              />
              <Form.Checkbox
                label="Mucho tiempo de uso"
                name="usage"
                onChange={this.handleFailureReasonsChange}
                checked={this.state.failureReasonsArray.includes('usage')}
                key="usage"
              />
              <Form.Checkbox
                label="Le pasó de la nada (en un momento estaba bien y luego comenzó a fallar)"
                name="sudden"
                onChange={this.handleFailureReasonsChange}
                checked={this.state.failureReasonsArray.includes('sudden')}
                key="sudden"
              />
            </Form.Field>
          </Form.Group>
        </Transition>

        <Form.Field>
          <label>¿Has llevado el teléfono al servicio técnico?</label>
          <Button
            inverted
            color="green"
            name="techService"
            value={false}
            onClick={this.handleChange}
            active={this.state.techService === false}
            className={formStyles.button}
            key="perfect"
            size="big"
          >
            No
          </Button>
          <Button
            inverted
            color="green"
            name="techService"
            value={true}
            onClick={this.handleChange}
            active={this.state.techService === true}
            className={formStyles.button}
            key="fails"
            size="big"
          >
            Sí
          </Button>
        </Form.Field>
        <Transition
          animation="fade up"
          duration="300"
          visible={this.state.techService === true}
          unmountOnHide
        >
          <Form.TextArea
            label="¿Cuál fue el diagnóstico del celular?"
            placeholder="Diagnóstico del servicio técnico"
            onChange={this.handleTechServiceDiagnosis}
            value={this.state.techServiceDiagnosis}
          ></Form.TextArea>
        </Transition>
        <Transition
          animation="fade up"
          duration="300"
          visible={
            this.state.error === true && this.state.triedToSubmit === true
          }
          unmountOnHide
        >
          <Message
            error
            header="Debes completar todos los campos"
            list={this.formErrors}
          ></Message>
        </Transition>
        <Grid>
          <Grid.Column textAlign="center">
            <Divider></Divider>
            <Form.Button size="big" onClick={this.handleSubmit}>
              Calcular precio
            </Form.Button>
            <Transition
              visible={this.state.showPrice === true}
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
                  {formatCurrency(this.state.price)}
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
                <Header
                  as="h2"
                  style={{margin: '0', padding: '0', fontWeight: '400'}}
                >
                  {formatCurrency(this.state.marketPrice)}
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
                      <Button color="green" content="Confirm the launch" />
                    }
                    on="click"
                    position="bottom right"
                  />
                </Header>
              </div>
            </Transition>
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

export default ProductForm
