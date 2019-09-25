import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import React, { useEffect } from 'react'
import Router from 'next/router'
import { useGCPProjects } from 'lib/resource/gcp-project'

const Component: React.FC = () => {
  const hrefNew = `/gcp-projects/new`
  const [gcpProjects, getGCPProjects, loading, error] = useGCPProjects()
  const rows = gcpProjects || []

  useEffect(() => {
    getGCPProjects()
  }, [])

  console.log(`gcpProjects: ${JSON.stringify(gcpProjects)}`)

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => Router.push(hrefNew)}
        >
          Register
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(entity => (
                <TableRow key={entity.id}>
                  <TableCell component="th" scope="row">
                    {entity.projectName}
                  </TableCell>
                  <TableCell>{entity.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Component
