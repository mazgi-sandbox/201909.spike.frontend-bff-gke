import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Link from 'next/link'
import Memory from '@material-ui/icons/Memory'
import React from 'react'

const href = `/virtual-machines`

const Component: React.FC = () => (
  <Link href={href}>
    <ListItem button>
      <ListItemIcon>
        <Memory />
      </ListItemIcon>
      <ListItemText primary="Virtual Machines" />
    </ListItem>
  </Link>
)

export default Component
