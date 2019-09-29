import { useCallback, useState } from 'react'
import { generateMessage } from 'components/molecules/SnackbarMolecules'
import getConfig from 'next/config'
import { loadTokenFromCookie } from 'lib/util/cookie'
import { notificationEnqueueMessage } from 'lib/redux/ui'
import { useDispatch } from 'react-redux'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.IS_DEVELOPMENT
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useGraphQLRequest: () => [
  (query: string, actionType: string, field: string) => void,
  boolean,
  Error[]
] = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const fetchGraphQL: (
    query: string,
    actionType: string,
    field: string
  ) => void = async (query, actionType, fieldName) => {
    const token = loadTokenFromCookie()
    const fetchOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-jwt': token },
      body: JSON.stringify({ query })
    }
    setLoading(true)
    try {
      isDev && console.log(`endpoint: ${endpoint}`)
      const response = await fetch(endpoint, fetchOpts)
      isDev &&
        console.log(
          `response.status: ${response.status}, ${response.statusText}`
        )
      const result = await response.json()
      isDev && console.log(`response.json() ${JSON.stringify(result, null, 2)}`)
      const errors = result.errors
      if (errors) {
        console.log(
          `Error(s) found on GraphQL result: ${JSON.stringify(errors, null, 2)}`
        )
        setErrors(errors)
      } else {
        const data = result.data
        const value = data[fieldName]
        isDev && console.log(`value: ${JSON.stringify(value)}`)
        const action = { type: actionType }
        action[fieldName] = value
        dispatch(action)
      }
    } catch (e) {
      console.log(`An error occurred: ${JSON.stringify(e)}`)
      setErrors([e])
    }
    setLoading(false)
  }
  errors.forEach(e => {
    const message = generateMessage(e.message)
    dispatch(notificationEnqueueMessage(message))
  })
  const funcFetchGraphQL = useCallback(fetchGraphQL, [loading, errors])
  return [funcFetchGraphQL, loading, errors]
}

export default useGraphQLRequest
