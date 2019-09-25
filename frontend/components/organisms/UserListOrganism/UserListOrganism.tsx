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
import { useUsers } from 'lib/resource/user'

const Component: React.FC = () => {
  const hrefNew = `/users/new`
  const [users, getUsers, loading, error] = useUsers()

  useEffect(() => {
    getUsers()
  }, [])
  const rows = users || []

  console.log(`users: ${JSON.stringify(users)}`)

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
                <TableCell>Display Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(user => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.displayName}</TableCell>
                  <TableCell>{user.email}</TableCell>
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
