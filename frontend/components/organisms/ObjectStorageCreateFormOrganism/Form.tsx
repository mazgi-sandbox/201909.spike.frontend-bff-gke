import {
  Button,
  Grid,
  Paper,
  TextField,
  Theme,
  makeStyles
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { actionTypes } from 'lib/redux/resource'
import faker from 'faker'
import { generateMessage } from 'components/molecules/SnackbarMolecules'
import { notificationEnqueueMessage } from 'lib/redux/ui'
import { useDispatch } from 'react-redux'
import useForm from 'react-hook-form'
import { useGraphQLRequest } from 'lib/util/request'

const useStyles = makeStyles((theme: Theme) => ({
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
  const [funcFetchGraphQL, loading, fetchErrors] = useGraphQLRequest()
  useEffect(() => {
    fetchErrors.forEach(err => {
      const message = generateMessage(err.message)
      dispatch(notificationEnqueueMessage(message))
    })
  }, fetchErrors)
  const onSubmit = data => {
    console.log(`create a object storage: ${JSON.stringify(data)}`)
    const query = `
    mutation{
      createObjectStorage(
        type: "${data.type}",
        location: "${data.location}",
        name: "${data.name}",
        description: "${data.description}"
      ) {
        id
        type
        location
        name
        description
      }
    }
    `
    funcFetchGraphQL(
      query,
      actionTypes.REGISTER_GCP_PROJECT_SUCCESS,
      'createObjectStorage'
    )
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <TextField
              label="Type"
              id="type"
              name="type"
              type="text"
              fullWidth
              defaultValue="google-cloud-storage"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              id="location"
              name="location"
              type="text"
              fullWidth
              defaultValue="us-central"
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              id="name"
              name="name"
              type="text"
              fullWidth
              defaultValue={faker.random.uuid()}
              inputRef={register}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              id="description"
              name="description"
              type="text"
              fullWidth
              defaultValue={faker.lorem.words()}
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
