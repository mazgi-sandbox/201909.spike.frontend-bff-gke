import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'
import { loadTokenFromCookie } from 'lib/util/cookie'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useCurrentUser = () => {
  const query = `
  query{
    currentUser {
      id
      name
      displayName
      email
      token
    }
  }
  `
  const token = loadTokenFromCookie()
  const fetchOpts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-AUTH-JWT': token },
    body: JSON.stringify({ query })
  }
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const currentUser = useSelector(state => state.resource.currentUser)
  const dispatch = useDispatch()
  const funcGetCurrentUser: () => void = async () => {
    setLoading(true)
    try {
      console.log(`endpoint: ${endpoint}`)
      const response = await fetch(endpoint, fetchOpts)
      const result = await response.json()
      const data = result.data
      const currentUser = data.currentUser
      console.log(`currentUser: ${JSON.stringify(currentUser)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.CURRENT_USER_SUCCESS,
        currentUser
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const getCurrentUser = useCallback(funcGetCurrentUser, [
    loading,
    error,
    currentUser
  ])
  return [currentUser, getCurrentUser, loading, error]
}

export default useCurrentUser
