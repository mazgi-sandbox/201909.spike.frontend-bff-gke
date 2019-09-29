import * as icons from '@material-ui/icons'
import {
  AppBar,
  Badge,
  ClickAwayListener,
  IconButton,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import SignInMolecules from 'components/molecules/SignInMolecules'
import { actionTypes } from 'lib/redux/resource'
import clsx from 'clsx'
import { sidemenuOpenMenu } from 'lib/redux/ui'
import { useGraphQLRequest } from 'lib/util/request'

export type Props = {
  title?: string
}

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },

  menuButton: {
    marginRight: '1rem'
  },
  menuButtonHidden: {
    display: 'none'
  },

  title: {
    flexGrow: 1
  },

  accountInfoPaperTypography: {
    paddingLeft: '0.5rem'
  },
  accountInfoPaper: {
    position: 'absolute',
    top: '2rem',
    right: 0,
    left: 0
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const query = `
  query{
    currentUser {
      id
      name
      displayName
      email
      token
    }
  }
  `
  const [funcFetchGraphQL, loading, errors] = useGraphQLRequest()
  const classes = useStyles('')
  const dispatch = useDispatch()
  const [openAccountInfo, setOpenAccountInfo] = useState(false)
  const sidemenuIsOpen = useSelector(state => !!state.ui.sidemenuIsOpen)
  const notifications = useSelector(state => state.ui.notifications)
  const currentUser = useSelector(state => state.resource.currentUser)

  useEffect(() => {
    const id = setInterval(() => {
      funcFetchGraphQL(query, actionTypes.CURRENT_USER_SUCCESS, 'currentUser')
    }, 16 * 1000)
    return () => clearInterval(id)
  }, [])

  const handleDrawerOpen = () => {
    dispatch(sidemenuOpenMenu())
  }
  const handleAccountClick = () => {
    setOpenAccountInfo(true)
  }
  const handleAccountClickAway = () => {
    setOpenAccountInfo(false)
  }
  const { title } = props

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, sidemenuIsOpen && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(
            classes.menuButton,
            sidemenuIsOpen && classes.menuButtonHidden
          )}
        >
          <icons.Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          {title}
        </Typography>
        {(currentUser && (
          <Fragment>
            <IconButton color="inherit">
              <Badge badgeContent={notifications.length} color="secondary">
                <icons.Notifications />
              </Badge>
            </IconButton>
            <ClickAwayListener onClickAway={handleAccountClickAway}>
              <IconButton color="inherit" onClick={handleAccountClick}>
                <icons.AccountCircle />
                <Typography className={classes.accountInfoPaperTypography}>
                  {currentUser.name}
                </Typography>
                {openAccountInfo && (
                  <Paper className={classes.accountInfoPaper}>
                    <div>foo</div>
                    <div>foo</div>
                    <div>foo</div>
                    <div>foo</div>
                    <div>foo</div>
                  </Paper>
                )}
              </IconButton>
            </ClickAwayListener>
          </Fragment>
        )) || <SignInMolecules />}
      </Toolbar>
    </AppBar>
  )
}

Component.defaultProps = {
  title: '(title)'
}

export default Component
