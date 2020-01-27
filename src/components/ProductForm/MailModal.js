import React from 'react'
import {
  Header,
  Modal,
  Form,
  Input,
  Grid,
  Transition,
  Button,
  Icon,
} from 'semantic-ui-react'
import GoogleMap from '../GoogleMap'
import validateEmail from '../../utils/validateEmail'
import ErrorMessage from './ErrorMessage'

class MailModal extends React.Component {
  constructor(props) {
    super(props)
    this.trigger = props.trigger
    this.actionVerb = props.actionVerb
    this.message = props.message
    this.sheetsHook = props.sheetsHook
    this.intent = props.intent
    this.steps = props.steps
  }
  state = {
    name: '',
    email: '',
    phone: '',
    error: false,
    showInstructions: false,
  }
  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handlePhone = (e, {name, value}) =>
    this.setState({
      [name]: value
        .replace(/\D/g, '')
        .substring(0, 8)
        .replace(/(\d{4})(\d{1,4})/g, '$1 $2'),
    })

  handleSubmit = () => {
    const {name, email, phone} = this.state
    if (name === '' || name === undefined || !validateEmail(email)) {
      this.setState({error: true})
    } else {
      this.setState({error: false, showInstructions: true})
      this.sheetsHook({name, email, phone, intent: this.intent})
    }
  }

  render() {
    const {name, email, error, phone, showInstructions} = this.state
    return (
      <Modal dimmer="blurring" trigger={this.trigger} closeIcon>
        <Modal.Header>{this.message}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Transition
              animation="fade up"
              duration="300"
              visible={!showInstructions}
              unmountOnHide
            >
              <div>
                <Header>Datos de contacto</Header>
                <p>
                  Déjanos tu nombre y correo a continuación para mostrarte cómo{' '}
                  {this.actionVerb}.
                </p>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input
                    label="Nombre"
                    placeholder="Juan Pérez"
                    value={name}
                    name="name"
                    onChange={this.handleChange}
                  ></Form.Input>
                  <Form.Input
                    label="Correo"
                    type="email"
                    placeholder="juanperez@gmail.com"
                    value={email}
                    name="email"
                    onChange={this.handleChange}
                  ></Form.Input>
                  <Form.Field>
                    <label>Teléfono</label>
                    <Input
                      label="+56 9"
                      type="tel"
                      placeholder="4151 9094"
                      value={phone}
                      name="phone"
                      onChange={this.handlePhone}
                    ></Input>
                  </Form.Field>
                  <ErrorMessage
                    errorState={error}
                    formErrors={[
                      'Revisa tu nombre, ingresa un correo y un número válido',
                    ]}
                    triedToSubmit={true}
                  ></ErrorMessage>
                  <Grid>
                    <Grid.Column textAlign="center">
                      <Form.Button>Ver instrucciones</Form.Button>
                    </Grid.Column>
                  </Grid>
                </Form>
              </div>
            </Transition>
            <Transition
              animation="fade up"
              duration="300"
              visible={showInstructions}
              unmountOnHide
            >
              <Grid>
                <Grid.Column textAlign="center">
                  {this.steps}
                  <Header as="h4">
                    Encuéntranos en Av. Nueva Providencia 2260, local 171.
                  </Header>
                  <GoogleMap
                    trigger={
                      <Button
                        icon
                        labelPosition="right"
                        style={{marginTop: '1em'}}
                      >
                        Ver ubicación de la tienda
                        <Icon name="map marker alternate" />
                      </Button>
                    }
                  ></GoogleMap>
                  <Header as="h5">
                    Recuerda que los precios son valores estimados, previos a
                    revisión en el local.
                  </Header>
                </Grid.Column>
              </Grid>
            </Transition>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default MailModal
