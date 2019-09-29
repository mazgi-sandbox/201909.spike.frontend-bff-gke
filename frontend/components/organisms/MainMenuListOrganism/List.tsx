import {
  Dashboard,
  ObjectStorages,
  VirtualMachines
} from 'components/molecules/SideMenuItemsMolecules'
import React, { Fragment } from 'react'
import { List } from '@material-ui/core'
import { useSelector } from 'react-redux'

const Component: React.FC = () => {
  const currentUser = useSelector(state => state.resource.currentUser)
  const visible = !!currentUser
  return (
    <List>
      {visible && (
        <Fragment>
          <Dashboard />
          <VirtualMachines />
          <ObjectStorages />
        </Fragment>
      )}
    </List>
  )
}

export default Component
