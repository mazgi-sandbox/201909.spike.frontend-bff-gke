import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.IS_DEVELOPMENT

export const saveTokenToCookie: (token: string) => void = token => {
  if (process.browser) {
    const expires = new Date()
    expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000) // until tomorrow
    const cookie = `token=${
      token ? token : ''
    }; expires=${expires.toUTCString()}; path=/`
    console.log(`saving cookie.`)
    document.cookie = cookie
  }
}

export const loadTokenFromCookie: () => string = () => {
  const regex = /token=([^;]*);/
  isDev && console.log(`start loading token from cookie.`)
  const isBrowser = process.browser
  // isDev && console.log(`isBrowser: ${isBrowser}`)
  if (isBrowser) {
    const cookie = document.cookie
    isDev && console.log(`raw cookie: ${cookie}`)
    if (cookie) {
      const match = `${cookie};`.match(regex)
      // isDev && console.log(`match: ${JSON.stringify(match)}`)
      if (match.length == 2) {
        const token = match[1]
        if (token) {
          console.log(`loaded token from cookie: ${token}`)
          return token
        }
      }
    }
  }
  return null
}
