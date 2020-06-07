import React from 'react'
import {Responsive, Grid, Modal} from 'semantic-ui-react'

function GoogleMap({trigger}) {
  return (
    <Modal dimmer="blurring" trigger={trigger} closeIcon>
      <Modal.Content>
        <Grid textAlign="center">
          <Responsive minWidth={852}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203.18411752297294!2d-71.62196423947742!3d-35.43137064060438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6d0b427c58b%3A0x6062931a7ec9e84e!2sEspacio%20Vivo%20Tue!5e0!3m2!1ses!2scl!4v1591563690933!5m2!1ses!2scl"
              frameborder="0"
              height="400"
              width="600"
              style={{border: 0}}
              allowfullscreen=""
            ></iframe>
          </Responsive>
          <Responsive minWidth={520} maxWidth={852}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203.18411752297294!2d-71.62196423947742!3d-35.43137064060438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6d0b427c58b%3A0x6062931a7ec9e84e!2sEspacio%20Vivo%20Tue!5e0!3m2!1ses!2scl!4v1591563690933!5m2!1ses!2scl"
              frameborder="0"
              height="250"
              width="400"
              style={{border: 0}}
              allowfullscreen=""
            ></iframe>
          </Responsive>
          <Responsive minWidth={440} maxWidth={520}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203.18411752297294!2d-71.62196423947742!3d-35.43137064060438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6d0b427c58b%3A0x6062931a7ec9e84e!2sEspacio%20Vivo%20Tue!5e0!3m2!1ses!2scl!4v1591563690933!5m2!1ses!2scl"
              frameborder="0"
              height="220"
              width="350"
              style={{border: 0}}
              allowfullscreen=""
            ></iframe>
          </Responsive>
          <Responsive maxWidth={440}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203.18411752297294!2d-71.62196423947742!3d-35.43137064060438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9665c6d0b427c58b%3A0x6062931a7ec9e84e!2sEspacio%20Vivo%20Tue!5e0!3m2!1ses!2scl!4v1591563690933!5m2!1ses!2scl"
              frameborder="0"
              style={{border: 0}}
              allowfullscreen=""
            ></iframe>
          </Responsive>
        </Grid>
      </Modal.Content>
    </Modal>
  )
}

export default GoogleMap
