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
  const hrefNew = `/object-storages/new`
  const query = `
  query{
    objectStorages {
      id
      type
      location
      name
      description
      syncStatus
    }
  }
  `
  const objectStorages = useSelector(state => state.resource.objectStorages)
  const rows = objectStorages || []
  const [funcFetchGraphQL, loading, errors] = useGraphQLRequest()

  useEffect(() => {
    const id = setInterval(() => {
      funcFetchGraphQL(
        query,
        actionTypes.OBJECT_STORAGES_SUCCESS,
        'objectStorages'
      )
    }, 4 * 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => Router.push(hrefNew)}
        >
          Create
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(objectStorage => (
                <TableRow key={objectStorage.id}>
                  <TableCell component="th" scope="row">
                    {objectStorage.name}
                  </TableCell>
                  <TableCell>{objectStorage.description}</TableCell>
                  <TableCell>{objectStorage.type}</TableCell>
                  <TableCell>{objectStorage.location}</TableCell>
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
