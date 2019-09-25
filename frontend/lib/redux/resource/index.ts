export const actionTypes = {
  GCP_PROJECTS_SUCCESS: 'RESOURCE/GCP_PROJECTS_SUCCESS',
  REGISTER_GCP_PROJECT_SUCCESS: 'RESOURCE/REGISTER_GCP_PROJECT_SUCCESS',
  OBJECT_STORAGES_SUCCESS: 'RESOURCE/OBJECT_STORAGES_SUCCESS',
  CREATE_OBJECT_STORAGE_SUCCESS: 'RESOURCE/CREATE_OBJECT_STORAGE_SUCCESS',
  USERS_SUCCESS: 'RESOURCE/USERS_SUCCESS',
  CREATE_USER_SUCCESS: 'RESOURCE/CREATE_USER_SUCCESS'
}

const defaultInitialState = {
  users: []
}

export const reducer = (state = defaultInitialState, action) => {
  switch (action.type) {
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
