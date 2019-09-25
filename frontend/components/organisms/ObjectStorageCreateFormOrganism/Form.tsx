import {
  Button,
  Grid,
  Paper,
  TextField,
  Theme,
  makeStyles
} from '@material-ui/core'
import React from 'react'
import faker from 'faker'
import { useCreateObjectStorage } from 'lib/resource/object-storage'
import useForm from 'react-hook-form'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))

const Component = () => {
  const classes = useStyles('')
  const { register, handleSubmit, watch, errors } = useForm()
  const [
    objectStorage,
    putObjectStorage,
    loading,
    error
  ] = useCreateObjectStorage()
  const onSubmit = data => {
    console.log(`create a object storage: ${JSON.stringify(data)}`)
    putObjectStorage(data)
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
