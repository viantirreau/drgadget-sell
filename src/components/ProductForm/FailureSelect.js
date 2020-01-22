import React from 'react'
import {Form, Button, Transition} from 'semantic-ui-react'
import formStyles from './form.module.css'

function FailureSelect({
  hasFailure,
  defectsDescriptions,
  failuresArray,
  failureReasonsArray,
  cbFailures,
  cbReasons,
  cbChange,
}) {
  let failureReasonObj = {
    water: 'Se cayó al agua',
    crash: 'Se golpeó contra el suelo',
    usage: 'Mucho tiempo de uso',
    sudden:
      'Le pasó de la nada (en un momento estaba bien y luego comenzó a fallar)',
  }
  return (
    <div>
      <Form.Field>
        <label>¿Tu teléfono tiene alguna falla?</label>
        <Button
          inverted
          color="green"
          name="hasFailure"
          value={false}
          onClick={cbChange}
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
          onClick={cbChange}
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
        visible={hasFailure === true}
        unmountOnHide
      >
        <Form.Group grouped>
          <Form.Field>
            <label>Selecciona las fallas de tu equipo</label>
            {/* screen,battery,charger,home,backcam,frontcam,earspeaker,loudspeaker,glass,chassis */}
            {Object.entries(defectsDescriptions).map(
              ([defect, description]) => {
                return (
                  <Form.Checkbox
                    label={description}
                    name={defect}
                    onChange={cbFailures}
                    key={defect}
                    /* This preserves the form state when hasFailure is toggled
                         and the Transition is hidden and then unmounted. When it is
                         active again, the answers will remain the same as before.
                      */
                    checked={failuresArray.includes(defect)}
                  />
                )
              },
            )}
          </Form.Field>
          <Form.Field>
            <label>
              Selecciona los posibles factores que causaron
              {failuresArray.length > 1 ? ' las fallas' : ' la falla'}
            </label>
            {Object.entries(failureReasonObj).map(([reason, label]) => {
              return (
                <Form.Checkbox
                  label={label}
                  name={reason}
                  onChange={cbReasons}
                  checked={failureReasonsArray.includes(reason)}
                  key={reason}
                />
              )
            })}
          </Form.Field>
        </Form.Group>
      </Transition>
    </div>
  )
}

export default FailureSelect
