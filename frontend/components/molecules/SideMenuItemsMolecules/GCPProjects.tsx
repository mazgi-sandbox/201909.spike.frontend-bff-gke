import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import Cloud from '@material-ui/icons/Cloud'
import Link from 'next/link'
import React from 'react'

const href = `/gcp-projects`

const Component: React.FC = () => (
  <Link href={href}>
    <ListItem button>
      <ListItemIcon>
        <Cloud />
      </ListItemIcon>
      <ListItemText primary="GCP Projects" />
    </ListItem>
  </Link>
)

export default Component
