import * as icons from '@material-ui/icons'
import { Button, IconButton, Snackbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { notificationDequeueMessage } from 'lib/redux/ui'

export type Message = {
  key: string
  text: string
}

const Component: React.FC = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(state => state.ui.notifications)
  const message = notifications.length > 0 ? notifications[0] : null
  const messageKey = (message && message.key) || ''
  const messageText = (message && message.text) || ''
  const handleClose: () => void = () => {
    dispatch(notificationDequeueMessage(message))
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      open={!!message}
      ContentProps={{
        'aria-describedby': 'message-id'
      }}
      message={<span id={messageKey}>{messageText}</span>}
      action={[
        <Button
          key="closeButton"
          color="secondary"
          size="small"
          onClick={handleClose}
        >
          Close
        </Button>
        // <IconButton
        //   key="close"
        //   aria-label="close"
        //   color="inherit"
        //   onClick={handleClose}
        // >
        //   <icons.Close />
        // </IconButton>
      ]}
    />
  )
}

export default Component
