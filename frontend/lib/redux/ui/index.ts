import Message from 'components/molecules/SnackbarMolecules/Message'

export const actionTypes = {
  SIDEMENU_OPEN_MENU: 'UI/SIDEMENU_OPEN_MENU',
  SIDEMENU_CLOSE_MENU: 'UI/SIDEMENU_CLOSE_MENU',
  NOTIFICATION_ENQUEUE_MESSAGE: 'UI/NOTIFICATION_ENQUEUE_MESSAGE',
  NOTIFICATION_DEQUEUE_MESSAGE: 'UI/NOTIFICATION_DEQUEUE_MESSAGE',
  REDIRECT_DESTINATION: 'UI/REDIRECT_DESTINATION'
}

const defaultInitialState = {
  sidemenuIsOpen: true,
  notifications: [],
  supportFormCurrentStep: 0,
  redirectDestination: `/`
}

export const reducer = (state = defaultInitialState, action) => {
  switch (action.type) {
    case actionTypes.SIDEMENU_OPEN_MENU:
      return {
        ...state,
        sidemenuIsOpen: true
      }
    case actionTypes.SIDEMENU_CLOSE_MENU:
      return {
        ...state,
        sidemenuIsOpen: false
      }
    case actionTypes.NOTIFICATION_ENQUEUE_MESSAGE:
      return {
        ...state,
        notifications: [action.message].concat(state.notifications)
      }
    case actionTypes.NOTIFICATION_DEQUEUE_MESSAGE:
      return {
        ...state,
        notifications: state.notifications.filter(
          value => value.key !== action.message.key
        )
      }
    case actionTypes.REDIRECT_DESTINATION:
      return {
        ...state,
        redirectDestination: action.redirectDestination || '/'
      }

    default:
      return state
  }
}

export const sidemenuOpenMenu = () => {
  return { type: actionTypes.SIDEMENU_OPEN_MENU }
}
export const sidemenuCloseMenu = () => {
  return { type: actionTypes.SIDEMENU_CLOSE_MENU }
}
export const notificationEnqueueMessage = (message: Message) => {
  return { type: actionTypes.NOTIFICATION_ENQUEUE_MESSAGE, message }
}
export const notificationDequeueMessage = (message: Message) => {
  return { type: actionTypes.NOTIFICATION_DEQUEUE_MESSAGE, message }
}
export const setRedirectDestination = (redirectDestination: string) => {
  return { type: actionTypes.REDIRECT_DESTINATION, redirectDestination }
}
