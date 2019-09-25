import { GCPProjects, Users } from '../../molecules/SideMenuItemsMolecules'
import { List } from '@material-ui/core'
import React from 'react'

const Component: React.FC = () => (
  <List>
    <GCPProjects />
    <Users />
  </List>
)

export default Component
