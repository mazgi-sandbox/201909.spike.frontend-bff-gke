import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useCreateVirtualMachine = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const virtualMachine = useSelector(
    state => state.resource.createVirtualMachine
  )
  const dispatch = useDispatch()
  const funcPutVirtualMachine = async ({
    type,
    location,
    name,
    description
  }) => {
    const query = `
    mutation{
      createVirtualMachine(
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
      console.log(`data: ${JSON.stringify(data)}`)
      const virtualMachine = data.createVirtualMachine
      console.log(`createVirtualMachine: ${JSON.stringify(virtualMachine)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.CREATE_VIRTUAL_MACHINE_SUCCESS,
        useCreateVirtualMachine: virtualMachine
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const putVirtualMachine = useCallback(funcPutVirtualMachine, [
    loading,
    error,
    virtualMachine
  ])
  return [virtualMachine, putVirtualMachine, loading, error]
}

export default useCreateVirtualMachine
