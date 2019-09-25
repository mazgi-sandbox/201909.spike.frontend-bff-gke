import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useGCPProjects = () => {
  const query = `
  query{
    gcpProjects {
      id
      projectId
      projectName
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
  const gcpProjects = useSelector(state => state.resource.gcpProjects)
  const dispatch = useDispatch()
  const funcGetGCPProjects: () => void = async () => {
    setLoading(true)
    try {
      console.log(`endpoint: ${endpoint}`)
      const response = await fetch(endpoint, fetchOpts)
      const result = await response.json()
      const data = result.data
      const gcpProjects = data.gcpProjects
      console.log(`gcpProjects: ${JSON.stringify(gcpProjects)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.GCP_PROJECTS_SUCCESS,
        gcpProjects: gcpProjects
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const getGCPProjects = useCallback(funcGetGCPProjects, [
    loading,
    error,
    gcpProjects
  ])
  return [gcpProjects, getGCPProjects, loading, error]
}

export default useGCPProjects
