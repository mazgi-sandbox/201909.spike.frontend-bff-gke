import { loadTokenFromCookie, saveTokenToCookie } from 'lib/util/cookie'

export const actionTypes = {
  SIGN_IN_SUCCESS: 'RESOURCE/SIGN_IN_SUCCESS',
  CURRENT_USER_SUCCESS: 'RESOURCE/CURRENT_USER_SUCCESS',
  GCP_PROJECTS_SUCCESS: 'RESOURCE/GCP_PROJECTS_SUCCESS',
  REGISTER_GCP_PROJECT_SUCCESS: 'RESOURCE/REGISTER_GCP_PROJECT_SUCCESS',
  OBJECT_STORAGES_SUCCESS: 'RESOURCE/OBJECT_STORAGES_SUCCESS',
  CREATE_OBJECT_STORAGE_SUCCESS: 'RESOURCE/CREATE_OBJECT_STORAGE_SUCCESS',
  VIRTUAL_MACHINES_SUCCESS: 'RESOURCE/VIRTUAL_MACHINES_SUCCESS',
  CREATE_VIRTUAL_MACHINE_SUCCESS: 'RESOURCE/CREATE_VIRTUAL_MACHINE_SUCCESS',
  USERS_SUCCESS: 'RESOURCE/USERS_SUCCESS',
  CREATE_USER_SUCCESS: 'RESOURCE/CREATE_USER_SUCCESS'
}

const defaultInitialState = {
  token: loadTokenFromCookie()
}

export const reducer = (state = defaultInitialState, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN_SUCCESS: {
      const currentUser = action.signInLocal
      const token = currentUser ? currentUser.token : null
      saveTokenToCookie(token)
      return {
        ...state,
        currentUser,
        token
      }
    }
    case actionTypes.CURRENT_USER_SUCCESS: {
      const currentUser = action.currentUser
      const token = currentUser ? currentUser.token : null
      saveTokenToCookie(token)
      return {
        ...state,
        currentUser,
        token
      }
    }
    case actionTypes.GCP_PROJECTS_SUCCESS:
      return {
        ...state,
        gcpProjects: action.gcpProjects
      }
    case actionTypes.REGISTER_GCP_PROJECT_SUCCESS:
      return {
        ...state,
        registerGCPProject: action.registerGCPProject
      }
    case actionTypes.OBJECT_STORAGES_SUCCESS:
      return {
        ...state,
        objectStorages: action.objectStorages
      }
    case actionTypes.CREATE_OBJECT_STORAGE_SUCCESS:
      return {
        ...state,
        createObjectStorage: action.createObjectStorage
      }
    case actionTypes.VIRTUAL_MACHINES_SUCCESS:
      return {
        ...state,
        virtualMachines: action.virtualMachines
      }
    case actionTypes.CREATE_VIRTUAL_MACHINE_SUCCESS:
      return {
        ...state,
        createVirtualMachine: action.createVirtualMachine
      }
    case actionTypes.USERS_SUCCESS:
      return {
        ...state,
        users: action.users
      }
    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        createUser: action.createUser
      }
    default:
      return state
  }
}
