import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useCreateObjectStorage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const objectStorage = useSelector(state => state.resource.createObjectStorage)
  const dispatch = useDispatch()
  const funcPutObjectStorage = async ({
    type,
    location,
    name,
    description
  }) => {
    const query = `
    mutation{
      createObjectStorage(
        type: "${type}",
        location: "${location}",
        name: "${name}",
        description: "${description}"
      ) {
        id
        type
        location
        name
        description
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
      const objectStorage = data.createObjectStorage
      console.log(`createObjectStorage: ${JSON.stringify(objectStorage)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.CREATE_OBJECT_STORAGE_SUCCESS,
        createObjectStorage: objectStorage
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const putObjectStorage = useCallback(funcPutObjectStorage, [
    loading,
    error,
    objectStorage
  ])
  return [objectStorage, putObjectStorage, loading, error]
}

export default useCreateObjectStorage
