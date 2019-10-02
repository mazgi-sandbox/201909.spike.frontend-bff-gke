import { Button, Grid, Paper, TextField, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import Router from 'next/router'
import { actionTypes } from 'lib/redux/resource'
import faker from 'faker'
import { generateMessage } from 'components/molecules/SnackbarMolecules'
import getConfig from 'next/config'
import { notificationEnqueueMessage } from 'lib/redux/ui'
import { useDispatch } from 'react-redux'
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
  const hrefList = `/users`
  const classes = useStyles('')
  const { register, handleSubmit, watch, errors: formErrors } = useForm()
  const [funcFetchGraphQL, loading, fetchErrors] = useGraphQLRequest()
  const onSubmit = data => {
    console.log(`create a user: ${JSON.stringify(data, null, 2)}`)
    const query = `
    mutation{
      createUser(
        name: "${data.name}",
        displayName: "${data.displayName}",
        email: "${data.email}"
      ) {
        id
        name
        displayName
        email
      }
    }
    `
    funcFetchGraphQL(
      query,
      actionTypes.REGISTER_GCP_PROJECT_SUCCESS,
      'createUser'
    )
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <TextField
              label="Name"
              id="name"
              name="name"
              type="text"
              fullWidth
              defaultValue={isDev ? faker.internet.userName() : ''}
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Display Name"
              id="displayName"
              name="displayName"
              type="text"
              fullWidth
              defaultValue={isDev ? faker.name.findName() : ''}
              inputRef={register}
            />
          </Grid>
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
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
