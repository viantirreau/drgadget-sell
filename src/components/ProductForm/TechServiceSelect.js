import React from 'react'
import {Form, Button, Transition} from 'semantic-ui-react'
import formStyles from './form.module.css'

function TechServiceSelect({techService, diagnosis, cbChange, cbDiagnosis}) {
  return (
    <div>
      <Form.Field style={{marginTop: '1em'}}>
        <label>¿Has llevado el teléfono al servicio técnico?</label>
        <Button
          inverted
          color="green"
          name="techService"
          value={false}
          onClick={cbChange}
          active={techService === false}
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
          onClick={cbChange}
          active={techService === true}
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
        visible={techService === true}
        unmountOnHide
      >
        <Form.TextArea
          label="¿Cuál fue el diagnóstico del celular?"
          placeholder="Diagnóstico del servicio técnico"
          onChange={cbDiagnosis}
          value={diagnosis}
        ></Form.TextArea>
      </Transition>
    </div>
  )
}

export default TechServiceSelect
