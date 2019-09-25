import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useObjectStorages = () => {
  const query = `
  query{
    objectStorages {
      id
      type
      location
      name
      description
      syncStatus
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
  const objectStorages = useSelector(state => state.resource.objectStorages)
  const dispatch = useDispatch()
  const funcGetObjectStorages: () => void = async () => {
    setLoading(true)
    try {
      console.log(`endpoint: ${endpoint}`)
      const response = await fetch(endpoint, fetchOpts)
      const result = await response.json()
      const data = result.data
      const objectStorages = data.objectStorages
      console.log(`objectStorages: ${JSON.stringify(objectStorages)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.OBJECT_STORAGES_SUCCESS,
        objectStorages
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const getObjectStorages = useCallback(funcGetObjectStorages, [
    loading,
    error,
    objectStorages
  ])
  return [objectStorages, getObjectStorages, loading, error]
}

export default useObjectStorages
