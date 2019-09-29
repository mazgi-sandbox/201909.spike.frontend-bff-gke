import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL
console.log(`endpoint: ${endpoint}`)

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const currentUser = useSelector(state => state.resource.currentUser)
  const dispatch = useDispatch()
  const funcPutLogout = async () => {
    const query = `
    mutation{
      logout(
      ) {
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
        dispatch({
          type: actionTypes.CURRENT_USER_SUCCESS,
          currentUser: null
        })
      }
      setLoading(false)
    } catch (e) {
      console.log(`error: ${e}`)
      setLoading(false)
      setErrors([e])
    }
  }
  const deleteCurrentUser = useCallback(funcPutLogout, [loading, errors, null])
  return [null, deleteCurrentUser, loading, errors]
}

export default useLogout
