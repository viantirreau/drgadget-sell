import React from 'react'
import {Header, Modal, Form, Grid, GridRow} from 'semantic-ui-react'

function MailModal({trigger, message, actionVerb}) {
  return (
    <Modal dimmer="blurring" trigger={trigger}>
      <Modal.Header>{message}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>Datos de contacto</Header>
          <p>
            Déjanos tu nombre y correo a continuación para mostrarte cómo{' '}
            {actionVerb}.
          </p>
          <Form>
            <Form.Input
              label="Tu correo"
              type="email"
              placeholder="juanperez@gmail.com"
            ></Form.Input>
            <Grid>
              <Grid.Column textAlign="center">
                <Form.Button>Ver instrucciones</Form.Button>
              </Grid.Column>
            </Grid>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default MailModal
