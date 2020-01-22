import React from 'react'
import {Transition, Message} from 'semantic-ui-react'

function ErrorMessage({errorState, triedToSubmit, formErrors}) {
  return (
    <Transition
      animation="fade up"
      duration="300"
      visible={errorState === true && triedToSubmit === true}
      unmountOnHide
    >
      <Message
        error
        header="Debes completar todos los campos"
        list={formErrors}
      ></Message>
    </Transition>
  )
}

export default ErrorMessage
