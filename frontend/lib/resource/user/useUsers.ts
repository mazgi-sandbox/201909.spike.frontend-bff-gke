import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useUsers = () => {
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
  const fetchOpts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const users = useSelector(state => state.resource.users)
  const dispatch = useDispatch()
  const funcGetUsers: () => void = async () => {
    setLoading(true)
    try {
      console.log(`endpoint: ${endpoint}`)
      const response = await fetch(endpoint, fetchOpts)
      const result = await response.json()
      const data = result.data
      const users = data.users
      console.log(`users: ${JSON.stringify(users)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.USERS_SUCCESS,
        users
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const getUsers = useCallback(funcGetUsers, [loading, error, users])
  return [users, getUsers, loading, error]
}

export default useUsers
