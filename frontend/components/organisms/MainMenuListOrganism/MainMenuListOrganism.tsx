import {
  Dashboard,
  ObjectStorages
} from 'components/molecules/SideMenuItemsMolecules'
import { List } from '@material-ui/core'
import React from 'react'

const Component: React.FC = () => (
  <List>
    <Dashboard />
    <ObjectStorages />
  </List>
)

export default Component
