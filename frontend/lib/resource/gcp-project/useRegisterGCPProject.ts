import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionTypes } from 'lib/redux/resource'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.BFF_ENDPOINT_GRAPHQL

const useRegisterGCPProject = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const gcpProject = useSelector(state => state.resource.registerGCPProject)
  const dispatch = useDispatch()
  const funcPutGCPProject = async ({ projectId, description }) => {
    const query = `
    mutation{
      registerGCPProject(
        projectId: "${projectId}",
        description: "${description}"
      ) {
        id
        projectId
        projectName
        description
        syncStatus
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
      const gcpProject = data.registerGCPProject
      console.log(`registerGCPProject: ${JSON.stringify(gcpProject)}`)
      setLoading(false)
      dispatch({
        type: actionTypes.REGISTER_GCP_PROJECT_SUCCESS,
        registerGCPProject: gcpProject
      })
    } catch (e) {
      console.log(`err: ${e}`)
      setLoading(false)
      setError(e.message)
    }
  }
  const putGCPProject = useCallback(funcPutGCPProject, [
    loading,
    error,
    gcpProject
  ])
  return [gcpProject, putGCPProject, loading, error]
}

export default useRegisterGCPProject
