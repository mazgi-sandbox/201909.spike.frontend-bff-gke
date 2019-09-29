import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL
console.log(`endpoint: ${endpoint}`)

const useCreateUser = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
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
    const fetchOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    }

    setLoading(true)
    try {
      const response = await fetch(endpoint, fetchOpts)
      console.log(`response.status: ${response.status}, ${response.statusText}`)
      const result = await response.json()
      console.log(`response:.json() ${JSON.stringify(result, null, 2)}`)
      const errors = result.errors
      if (errors) {
        console.log(`errors: ${JSON.stringify(errors, null, 2)}`)
        setErrors(errors)
      } else {
        const data = result.data
        const user = data.createUser
        dispatch({
          type: actionTypes.CREATE_USER_SUCCESS,
          createUser: user
        })
      }
      setLoading(false)
    } catch (e) {
      console.log(`error: ${e}`)
      setLoading(false)
      setErrors([e])
    }
  }
  const putUser = useCallback(funcPutUser, [loading, errors, user])
  return [user, putUser, loading, errors]
}

export default useCreateUser
