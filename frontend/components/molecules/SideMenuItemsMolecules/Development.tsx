import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import BugReport from '@material-ui/icons/BugReport'
import React from 'react'
import faker from 'faker'
import { generateMessage } from 'components/molecules/SnackbarMolecules'
import { notificationEnqueueMessage } from 'lib/redux/ui'
import { useDispatch } from 'react-redux'

const Component: React.FC = () => {
  const dispatch = useDispatch()
  const clickHandler: () => void = () => {
    const message = generateMessage(faker.lorem.words())
    dispatch(notificationEnqueueMessage(message))
  }

  return (
    <ListItem button onClick={clickHandler}>
      <ListItemIcon>
        <BugReport />
      </ListItemIcon>
      <ListItemText primary="(development)" />
    </ListItem>
  )
}

export default Component
