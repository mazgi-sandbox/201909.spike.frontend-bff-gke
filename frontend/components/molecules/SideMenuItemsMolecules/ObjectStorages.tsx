import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import Storage from '@material-ui/icons/Storage'

const href = `/object-storages`

const Component: React.FC = () => (
  <Link href={href}>
    <ListItem button>
      <ListItemIcon>
        <Storage />
      </ListItemIcon>
      <ListItemText primary="Object Storages" />
    </ListItem>
  </Link>
)

export default Component
