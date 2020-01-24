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
    key: 'repair',
    icon: 'wrench',
    title: 'Reparamos tu equipo',
    description: 'Al instante',
  },
  {
    key: 'repaired',
    icon: 'mobile alternate',
    title: 'Funciona!',
    description: 'Lleva tu equipo arreglado',
  },
]

const Repair = () => <Step.Group items={steps} stackable="tablet" />

export default Repair
