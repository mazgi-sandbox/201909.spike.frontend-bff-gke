import * as Icons from '@material-ui/icons'
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import { actionTypes } from 'lib/redux/resource'
import { useGraphQLRequest } from 'lib/util/request'
import { useSelector } from 'react-redux'

const Component: React.FC = () => {
  const hrefNew = `/users/new`
  const query = `
  query{
    users {
      id
      name
      displayName
      email
    }
  }
  `
  const users = useSelector(state => state.resource.users)
  const rows = users || []
  const [funcFetchGraphQL, loading, errors] = useGraphQLRequest()
  useEffect(() => {
    const id = setInterval(() => {
      funcFetchGraphQL(query, actionTypes.USERS_SUCCESS, 'users')
    }, 60 * 60 * 1000)
    return () => clearInterval(id)
  }, [])
  const [selected, setSelected] = useState([])
  const isSelected = (id: string) => selected.indexOf(id) !== -1
  const handleUnRegister = () => {
    console.log(`un-register: targets=> ${selected}`)
  }
  const handleRefreshClick = () => {
    funcFetchGraphQL(query, actionTypes.USERS_SUCCESS, 'users')
  }
  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map(row => row.id)
      setSelected(newSelecteds)
    } else {
      setSelected([])
    }
  }
  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Button color="primary" onClick={() => Router.push(hrefNew)}>
          <Icons.AddCircle />
          Register
        </Button>
        <Button color="primary" onClick={handleRefreshClick}>
          <Icons.Refresh />
          Refresh
        </Button>
        {/* <Button
          color="primary"
          onClick={() => Router.push(hrefNew)}
          disabled={selected.length == 0}
        >
          <Icons.PlayArrow />
          Start
        </Button>
        <Button
          color="primary"
          onClick={() => Router.push(hrefNew)}
          disabled={selected.length == 0}
        >
          <Icons.Stop />
          Stop
        </Button> */}
        <Button
          color="primary"
          onClick={handleUnRegister}
          disabled={selected.length == 0}
        >
          <Icons.RemoveCircle />
          Un-Register
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ 'aria-label': 'select all' }}
                    indeterminate={
                      selected.length > 0 && selected.length < rows.length
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleCheckAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Display Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(user => (
                <TableRow key={user.id} selected={isSelected(user.id)}>
                  <TableCell
                    padding="checkbox"
                    onClick={event => handleClick(event, user.id)}
                  >
                    <Checkbox
                      inputProps={{ 'aria-labelledby': user.id }}
                      checked={isSelected(user.id)}
                    />
                  </TableCell>
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
