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
  const hrefNew = `/virtual-machines/new`
  const query = `
  query{
    virtualMachines {
      id
      type
      location
      name
      description
      syncStatus
    }
  }
  `
  const virtualMachines = useSelector(state => state.resource.virtualMachines)
  const rows = virtualMachines || []
  const [funcFetchGraphQL, loading, errors] = useGraphQLRequest()
  useEffect(() => {
    const id = setInterval(() => {
      funcFetchGraphQL(
        query,
        actionTypes.VIRTUAL_MACHINES_SUCCESS,
        'virtualMachines'
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
              {rows.map(virtualMachine => (
                <TableRow key={virtualMachine.id}>
                  <TableCell component="th" scope="row">
                    {virtualMachine.name}
                  </TableCell>
                  <TableCell>{virtualMachine.description}</TableCell>
                  <TableCell>{virtualMachine.type}</TableCell>
                  <TableCell>{virtualMachine.location}</TableCell>
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
