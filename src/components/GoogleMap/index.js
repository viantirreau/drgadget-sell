import React from 'react'
import {Responsive, Grid, Modal} from 'semantic-ui-react'

function GoogleMap({trigger}) {
  return (
    <Modal dimmer="blurring" trigger={trigger} closeIcon>
      <Modal.Content>
        <Grid textAlign="center">
          <Responsive minWidth={852}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6660.074967360167!2d-70.61068659790038!3d-33.42226709948524!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf68bee3a381%3A0x46d87478c8643252!2sAv.%20Nueva%20Providencia%202260%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1579806315812!5m2!1ses-419!2scl"
              frameborder="0"
              height="400"
              width="600"
              style={{border: 0}}
              allowfullscreen=""
            ></iframe>
          </Responsive>
          <Responsive minWidth={520} maxWidth={852}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6660.074967360167!2d-70.61068659790038!3d-33.42226709948524!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf68bee3a381%3A0x46d87478c8643252!2sAv.%20Nueva%20Providencia%202260%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1579806315812!5m2!1ses-419!2scl"
              frameborder="0"
              height="250"
              width="400"
              style={{border: 0}}
              allowfullscreen=""
            ></iframe>
          </Responsive>
          <Responsive minWidth={440} maxWidth={520}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6660.074967360167!2d-70.61068659790038!3d-33.42226709948524!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf68bee3a381%3A0x46d87478c8643252!2sAv.%20Nueva%20Providencia%202260%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1579806315812!5m2!1ses-419!2scl"
              frameborder="0"
              height="220"
              width="350"
              style={{border: 0}}
              allowfullscreen=""
            ></iframe>
          </Responsive>
          <Responsive maxWidth={440}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6660.074967360167!2d-70.61068659790038!3d-33.42226709948524!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf68bee3a381%3A0x46d87478c8643252!2sAv.%20Nueva%20Providencia%202260%2C%20Providencia%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1579806315812!5m2!1ses-419!2scl"
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
