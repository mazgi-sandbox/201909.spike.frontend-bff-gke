import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import { actionTypes } from 'lib/redux/resource'
import faker from 'faker'
import { generateMessage } from 'components/molecules/SnackbarMolecules'
import getConfig from 'next/config'
import { makeStyles } from '@material-ui/core'
import { notificationEnqueueMessage } from 'lib/redux/ui'
import useForm from 'react-hook-form'
import { useGraphQLRequest } from 'lib/util/request'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.IS_DEVELOPMENT

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

const Component = () => {
  const dispatch = useDispatch()
  const classes = useStyles('')
  const { register, handleSubmit, watch, errors } = useForm()
  const redirectDestination = useSelector(state => state.ui.redirectDestination)
  const [funcFetchGraphQL, loading, fetchErrors] = useGraphQLRequest()
  useEffect(() => {
    fetchErrors.forEach(err => {
      const message = generateMessage(err.message)
      dispatch(notificationEnqueueMessage(message))
    })
  }, fetchErrors)
  const onSubmit = data => {
    console.log(`Sign in: ${JSON.stringify(data)}`)
    const query = `
    mutation{
      signInLocal(
        email: "${data.email}",
        password: "${data.password}"
      ) {
        id
        name
        displayName
        email
        token
      }
    }
    `
    funcFetchGraphQL(query, actionTypes.SIGN_IN_SUCCESS, 'signInLocal')
    if (fetchErrors.length == 0) {
      Router.push(redirectDestination)
    }
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <TextField
              label="Email"
              id="email"
              name="email"
              type="email"
              fullWidth
              defaultValue={isDev ? faker.internet.email() : ''}
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              id="password"
              name="password"
              type="password"
              fullWidth
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" color="primary" variant="contained">
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
