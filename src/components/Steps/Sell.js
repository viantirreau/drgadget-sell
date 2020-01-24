import React from 'react'
import {Step} from 'semantic-ui-react'

const steps = [
  {
    key: 'tienda',
    icon: 'building',
    title: 'Trae tu equipo al local',
    description: 'Abajo está la dirección',
  },
  {
    key: 'check',
    icon: 'tasks',
    title: 'Revisión del equipo',
    description: 'Evaluaremos su condición',
  },
  {
    key: 'money',
    icon: 'dollar sign',
    title: 'Obtén tu dinero',
    description: 'Únete a la economía circular',
  },
]

const Sell = () => <Step.Group items={steps} stackable="tablet" />

export default Sell
