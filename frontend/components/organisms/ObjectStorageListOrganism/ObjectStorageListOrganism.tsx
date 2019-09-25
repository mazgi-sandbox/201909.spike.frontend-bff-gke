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
import { useObjectStorages } from 'lib/resource/object-storage'

const Component: React.FC = () => {
  const hrefNew = `/object-storages/new`
  const [
    objectStorages,
    getObjectStorages,
    loading,
    error
  ] = useObjectStorages()
  const rows = objectStorages || []

  useEffect(() => {
    getObjectStorages()
  }, [])

  console.log(`objectStorages: ${JSON.stringify(objectStorages)}`)

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
