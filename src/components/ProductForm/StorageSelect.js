import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import formStyles from './form.module.css'

function StorageSelect({selectedStorage, storageCapacities, cbChange}) {
  return (
    <Form.Field>
      <label>Almacenamiento</label>
      {storageCapacities.map(option => (
        <Button
          inverted
          color="green"
          name="storage"
          onClick={cbChange}
          active={selectedStorage === option}
          key={option}
          value={option}
          size="big"
          className={formStyles.button}
        >
          {`${option} GB`}
        </Button>
      ))}
    </Form.Field>
  )
}

export default StorageSelect
