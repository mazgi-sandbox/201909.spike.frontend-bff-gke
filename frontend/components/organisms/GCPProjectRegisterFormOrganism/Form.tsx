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
import useForm from 'react-hook-form'
import { useRegisterGCPProject } from 'lib/resource/gcp-project'

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
  const [gcpProject, putGCPProject, loading, error] = useRegisterGCPProject()
  const onSubmit = data => {
    console.log(`register a GCP project: ${JSON.stringify(data)}`)
    putGCPProject(data)
  }

  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <TextField
              label="GCP Project ID"
              id="projectId"
              name="projectId"
              type="text"
              fullWidth
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
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Component
