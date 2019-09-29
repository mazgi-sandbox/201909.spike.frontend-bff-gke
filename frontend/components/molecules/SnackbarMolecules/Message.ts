import { v4 as uuid } from 'uuid'

interface Message {
  key: string
  text: string
}

export default Message

export const generateMessage: (text: string) => Message = text => {
  return {
    key: uuid(),
    text
  }
}
