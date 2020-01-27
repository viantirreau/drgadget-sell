/* eslint-disable camelcase */
/*eslint max-len: ["error", { "code": 110 }]*/
import React, {cloneElement} from 'react'
import {Form, Grid, Divider} from 'semantic-ui-react'
import StorageSelect from './StorageSelect'
import FailureSelect from './FailureSelect'
import TechServiceSelect from './TechServiceSelect'
import ErrorMessage from './ErrorMessage'
import PriceReport from './PriceReport'
import axios from 'axios'

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.defects = props.defects
    // https://stackoverflow.com/a/39333479
    this.defectsDescriptions = props.defectsDescriptions
    this.defectsTranslations = props.defectsTranslations
    this.repairs = props.repairs
    this.storageCapacities = props.storageCapacities
    this.versions = props.versions
    this.failures = {}
    this.failureReasons = {}
    this.formErrors = []
    this.formattedModel = props.formattedModel
  }
  // Set initial state here
  state = {
    failuresArray: [],
    failureReasonsArray: [],
    error: false,
    triedToSubmit: false,
    showPrice: false,
    repairPriceDetails: {},
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  /*
   Form state-preserving method, i.e. when a button causes the parent component to
   hide and unmount after the field using this handler as callback was filled, the answers
   are preserved if the parent is mounted and gets visible again.
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
      let repairPriceDetails = {}
      let totalRepairPrice = 0
      this.state.failuresArray.forEach(discount => {
        discounts += this.defects[discount]
        let translation = this.defectsTranslations[discount]
        repairPriceDetails[translation] = this.repairs[discount]
        totalRepairPrice += this.repairs[discount]
      })
      let buyPrice = Math.max(model.min, basePrice - discounts)
      this.setState({
        showPrice: true,
        price: buyPrice,
        marketPrice: model.market,
        totalRepairPrice,
        repairPriceDetails,
      })
    }
  }
  sheetsHook = ({name, email, phone, intent}) => {
    axios.get(
      'https://script.google.com/macros/s/AKfycbzJwcxNMecZ-3yAlNlFs_E8xNUbQ8g8ATl14LHM4oJ9hrGNbtcn/exec',
      {
        params: {
          Nombre: name,
          Correo: email,
          Teléfono: `+569${phone.replace(/\D/g, '')}`,
          Causa: intent,
          Equipo: this.formattedModel,
          Almacenamiento: `${this.state.storage} GB`,
          Fallas: this.state.failuresArray.join(', '),
          Razones: this.state.failureReasonsArray.join(', '),
          Diagnóstico: this.state.techServiceDiagnosis || '',
          'Precio retoma': this.state.price,
          'Precio reparación': this.state.totalRepairPrice,
        },
      },
    )
  }

  render() {
    const {
      storage,
      hasFailure,
      failuresArray,
      failureReasonsArray,
      techService,
      techServiceDiagnosis,
      error,
      triedToSubmit,
      showPrice,
      price,
      marketPrice,
      totalRepairPrice,
      repairPriceDetails,
    } = this.state
    return (
      <Form size="big">
        <StorageSelect
          selectedStorage={storage}
          storageCapacities={this.storageCapacities}
          cbChange={this.handleChange}
        />
        <FailureSelect
          hasFailure={hasFailure}
          defectsDescriptions={this.defectsDescriptions}
          failuresArray={failuresArray}
          failureReasonsArray={failureReasonsArray}
          cbChange={this.handleChange}
          cbFailures={this.handleFailureChange}
          cbReasons={this.handleFailureReasonsChange}
        />

        <TechServiceSelect
          techService={techService}
          diagnosis={techServiceDiagnosis}
          cbChange={this.handleChange}
          cbDiagnosis={this.handleTechServiceDiagnosis}
        />

        <ErrorMessage
          errorState={error}
          triedToSubmit={triedToSubmit}
          formErrors={this.formErrors}
        />
        <Grid>
          <Grid.Column textAlign="center">
            <Divider></Divider>
            <Form.Button size="big" onClick={this.handleSubmit}>
              Calcular precio
            </Form.Button>
            <PriceReport
              showPrice={showPrice}
              price={price}
              marketPrice={marketPrice}
              hasFailure={hasFailure}
              repairs={repairPriceDetails}
              repairPrice={totalRepairPrice}
              sheetsHook={this.sheetsHook}
            />
          </Grid.Column>
        </Grid>
      </Form>
    )
  }
}

export default ProductForm
