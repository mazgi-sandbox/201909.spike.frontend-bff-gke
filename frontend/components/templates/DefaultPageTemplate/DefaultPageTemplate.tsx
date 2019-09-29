import { Container, CssBaseline, Paper } from '@material-ui/core'
import { Theme, makeStyles } from '@material-ui/core/styles'
import DefaultAppBarOrganism from '../../organisms/DefaultAppBarOrganism'
import DefaultFooterOrganism from '../../organisms/DefaultFooterOrganism'
// import DefaultHeaderOrganism from '../../organisms/DefaultHeaderOrganism'
import DefaultSideMenuOrganism from '../../organisms/DefaultSideMenuOrganism'
import React from 'react'
import Router from 'next/router'
import SnackbarMolecules from 'components/molecules/SnackbarMolecules'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export type Props = {
  title?: string
  signInRequired: boolean
  children?: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },

  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const router = useRouter()
  const classes = useStyles('')
  const { title, signInRequired: loginRequired } = props
  const currentUser = useSelector(state => state.resource.currentUser)
  const visible = !loginRequired || currentUser

  // if (!visible) {
  //   if (router.pathname !== '/login') {
  //     if (process.browser) {
  //       Router.push('/login')
  //     }
  //   }
  // }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <DefaultAppBarOrganism title={title} />
      <DefaultSideMenuOrganism />
      <SnackbarMolecules />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {visible ? props.children : <Paper>Please login.</Paper>}
        </Container>
        <DefaultFooterOrganism />
      </main>
    </div>
  )
}

Component.defaultProps = {
  title: '(default page)',
  signInRequired: true,
  children: <div>(children)</div>
}

const mapStateToProps = (state, ownProps) => ({
  sidemenuIsOpen: state.ui.sidemenuIsOpen,
  notifications: state.ui.notifications
})
export default connect(mapStateToProps)(Component)
