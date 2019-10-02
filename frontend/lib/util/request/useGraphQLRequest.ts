import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { generateMessage } from 'components/molecules/SnackbarMolecules'
import getConfig from 'next/config'
import { loadTokenFromCookie } from 'lib/util/cookie'
import { notificationEnqueueMessage } from 'lib/redux/ui'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.IS_DEVELOPMENT
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

export const sendLogs = async msg => {
  const query = `
  mutation{
    log(
      message: "${msg}"
    )
  }
  `
  const fetchOpts = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query })
  }
  if (isDev) {
    await fetch(endpoint, fetchOpts)
  }
}

const useGraphQLRequest: () => [
  (query: string, actionType: string, field: string) => void,
  boolean,
  Error[]
] = () => {
  isDev && console.log(`endpoint: ${endpoint}`)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const dispatch = useDispatch()
  const tokenFromRedux = useSelector(state => state.resource.token)
  const fetchGraphQL: (
    query: string,
    actionType: string,
    field: string
  ) => void = async (query, actionType, fieldName) => {
    const tokenFromCookie = loadTokenFromCookie()
    const token = tokenFromRedux || tokenFromCookie
    isDev &&
      console.log(
        `stored tokens: ${JSON.stringify(
          {
            tokenFromRedux,
            tokenFromCookie,
            token
          },
          null,
          2
        )}`
      )
    const fetchOpts = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-auth-jwt': token
      },
      body: JSON.stringify({ query })
    }
    setLoading(true)
    try {
      const response = await fetch(endpoint, fetchOpts)
      isDev &&
        console.log(
          `response.status: ${response.status}, ${response.statusText}`
        )
      await sendLogs(
        `response.status: ${response.status}, ${response.statusText}`
      )
      const result = await response.json()
      isDev && console.log(`response.json() ${JSON.stringify(result, null, 2)}`)
      // await sendLogs(`response.json() ${JSON.stringify(result, null, 2)}`)
      const errors = result.errors
      if (errors) {
        console.log(
          `Error(s) found on GraphQL result: ${JSON.stringify(errors, null, 2)}`
        )
        // setErrors(errors)
        errors.forEach(async e => {
          await sendLogs(`error: ${e.message}`)
        })
      } else {
        const data = result.data
        const value = data[fieldName]
        isDev &&
          console.log(
            `load values from graphql result: ${JSON.stringify(value)}`
          )
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
