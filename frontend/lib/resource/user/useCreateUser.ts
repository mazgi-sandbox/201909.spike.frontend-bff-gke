import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import faker from 'faker'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useCreateUser = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const user = useSelector(state => state.resource.createUser)
  const dispatch = useDispatch()
  const funcPutUser = async ({ name, displayName, email, password }) => {
    const query = `
    mutation{
      createUser(
        name: "${name}",
        displayName: "${displayName}",
        email: "${email}"
      ) {
        id
        name
        displayName
        email
      }
    }
    `
    console.log(`query: ${query}`)
    console.log(`query(json): ${JSON.stringify(query)}`)
    const fetchOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    }

    setLoading(true)
    try {
      console.log(`endpoint: ${endpoint}`)
      const response = await fetch(endpoint, fetchOpts)
      console.log(`response.status: ${response.status}, ${response.statusText}`)
      const result = await response.json()
      const data = result.data
      const user = data.createUser
      console.log(`createUser: ${JSON.stringify(user)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.CREATE_USER_SUCCESS,
        createUser: user
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const putUser = useCallback(funcPutUser, [loading, error, user])
  return [user, putUser, loading, error]
}

export default useCreateUser
