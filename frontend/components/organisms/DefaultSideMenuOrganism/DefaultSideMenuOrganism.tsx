import * as icons from '@material-ui/icons'
import { Divider, Drawer, IconButton, ListSubheader } from '@material-ui/core'
import { Theme, makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import MainMenuListOrganism from 'components/organisms/MainMenuListOrganism'
import React from 'react'
import SettingMenuListOrganism from 'components/organisms/SettingMenuListOrganism'
import clsx from 'clsx'
import { sidemenuCloseMenu } from 'lib/redux/ui'

export type Props = {
  children?: React.ReactNode
}

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9)
    }
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const dispatch = useDispatch()
  const sidemenuIsOpen = useSelector(state => !!state.ui.sidemenuIsOpen)
  const handleDrawerClose: () => void = () => {
    dispatch(sidemenuCloseMenu())
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !sidemenuIsOpen && classes.drawerPaperClose
        )
      }}
      open={sidemenuIsOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <icons.ChevronLeft />
        </IconButton>
      </div>
      <Divider />
      <MainMenuListOrganism />
      <Divider />
      <ListSubheader inset>Settings</ListSubheader>
      <SettingMenuListOrganism />
    </Drawer>
  )
}

export default Component
