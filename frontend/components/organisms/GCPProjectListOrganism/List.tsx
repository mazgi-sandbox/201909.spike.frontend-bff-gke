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
import { actionTypes } from 'lib/redux/resource'
import { useGraphQLRequest } from 'lib/util/request'
import { useSelector } from 'react-redux'

const Component: React.FC = () => {
  const hrefNew = `/gcp-projects/new`
  const query = `
    query{
      gcpProjects {
        id
        projectId
        projectName
        description
        syncStatus
      }
    }
    `
  const gcpProjects = useSelector(state => state.resource.gcpProjects)
  const rows = gcpProjects || []
  const [funcFetchGraphQL, loading, errors] = useGraphQLRequest()

  useEffect(() => {
    funcFetchGraphQL(query, actionTypes.GCP_PROJECTS_SUCCESS, 'gcpProjects')
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button color="primary" onClick={() => Router.push(hrefNew)}>
          Register
        </Button>
        <Button
          color="primary"
          onClick={() => Router.push(hrefNew)}
          disabled={false}
        >
          Un-Register
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
              {rows.map(gcpProject => (
                <TableRow key={gcpProject.id}>
                  <TableCell component="th" scope="row">
                    {gcpProject.projectName}
                  </TableCell>
                  <TableCell>{gcpProject.description}</TableCell>
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
