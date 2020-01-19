/* eslint-disable camelcase */
/*eslint max-len: ["error", { "code": 110 }]*/
import React from 'react'
import {Form, Divider, Button, Transition} from 'semantic-ui-react'
import formStyles from './form.module.css'

class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.defects = props.defects
    this.storageCapacities = props.storageCapacities
    this.versions = props.versions
  }
  // Set initial state here
  state = {}

  handleChange = (e, {value}) => this.setState({value})
  handleStorage = (e, {storage}) => this.setState({storage})
  handleFailures = (e, {failure}) => this.setState({failure})

  render() {
    const {value, storage, failure} = this.state
    console.log(this.state)

    return (
      <Form size="big">
        <Form.Field>
          <label>Almacenamiento</label>
          {this.storageCapacities.map(option => (
            <Button
              inverted
              color="green"
              storage={option}
              onClick={this.handleStorage}
              active={storage === option}
              key={option}
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
            failure="false"
            onClick={this.handleFailures}
            active={failure === 'false'}
            className={formStyles.button}
            key="perfect"
          >
            No, está en perfecto estado
          </Button>
          <Button
            inverted
            color="green"
            failure="true"
            onClick={this.handleFailures}
            active={failure === 'true'}
            className={formStyles.button}
            key="fails"
          >
            Sí, tiene algunos detalles
          </Button>
        </Form.Field>
        <Transition
          animation="fade up"
          duration="300"
          visible={failure === 'true'}
        >
          <Form.Field>
            <label>Selecciona las fallas de tu equipo</label>
            {/* screen,battery,charger,home,backcam,frontcam,earspeaker,loudspeaker,glass,chassis */}
            <Form.Checkbox label="No funciona el táctil" name="screen" />
            <Form.Checkbox label="Batería en mal estado" name="battery" />
            <Form.Checkbox label="No carga el teléfono" name="charger" />
            <Form.Checkbox label="Falla el botón de inicio" name="home" />
            <Form.Checkbox
              label="Cámara trasera en mal estado"
              name="backcam"
            />
            <Form.Checkbox
              label="Cámara frontal en mal estado"
              name="frontcam"
            />
            <Form.Checkbox
              label="Falla el auricular (se escuchan mal las llamadas)"
              name="earspeaker"
            />
            <Form.Checkbox label="Parlante defectuoso" name="loudspeaker" />
            <Form.Checkbox label="Pantalla trizada" name="glass" />
            <Form.Checkbox
              label="Está abollado o roto en la parte trasera"
              name="chassis"
            />
          </Form.Field>
        </Transition>

        <Form.TextArea label="About" placeholder="Tell us more about you..." />
        <Form.Checkbox label="I agree to the Terms and Conditions" />
        <Form.Button>Calcular precio</Form.Button>
      </Form>
    )
  }
}

export default ProductForm
