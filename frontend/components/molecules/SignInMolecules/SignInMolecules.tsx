import { IconButton, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import Router, { useRouter } from 'next/router'
import { actionTypes, setRedirectDestination } from 'lib/redux/ui'
import { useDispatch } from 'react-redux'

const href = '/signin'

export type Props = {
  title?: string
  clickHandler?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void
}

const Component: React.FC<Props> = (props: Props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { title, clickHandler } = props
  const iAmThere = router.pathname === href
  const clickHandlerWrapper: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = event => {
    const path = router.pathname
    if (path && path !== href) {
      dispatch(setRedirectDestination(path))
    }
    clickHandler && clickHandler(event)
  }

  return (
    <Fragment>
      {iAmThere ? null : (
        <IconButton color="inherit" onClick={clickHandlerWrapper}>
          <Typography>{title}</Typography>
        </IconButton>
      )}
    </Fragment>
  )
}
Component.defaultProps = {
  title: 'Sign in',
  clickHandler: () => {
    if (process.browser) {
      Router.push(href)
    }
  }
}
export default Component
