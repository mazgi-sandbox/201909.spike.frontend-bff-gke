import {
  Development,
  GCPProjects,
  Users
} from '../../molecules/SideMenuItemsMolecules'
import React, { Fragment } from 'react'
import { List } from '@material-ui/core'
import getConfig from 'next/config'
import { useSelector } from 'react-redux'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.IS_DEVELOPMENT

const Component: React.FC = () => {
  const currentUser = useSelector(state => state.resource.currentUser)
  const visible = !!currentUser
  return (
    <List>
      {visible && (
        <Fragment>
          <GCPProjects />
          <Users />
        </Fragment>
      )}
      {isDev && <Development />}
    </List>
  )
}

export default Component
