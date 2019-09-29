export const saveTokenToCookie: (token: string) => void = token => {
  if (process.browser) {
    const expires = new Date()
    expires.setTime(expires.getTime() + 1 * 24 * 60 * 60 * 1000) // until tomorrow
    const cookie = `token=${
      token ? token : ''
    }; expires=${expires.toUTCString()}; path=/`
    console.log(`saving cookie: ${cookie}`)
    document.cookie = cookie
  }
}

export const loadTokenFromCookie: () => string | null = () => {
  if (process.browser) {
    const cookie = document.cookie
    console.log(`loaded cookie: ${cookie}`)
    if (cookie) {
      const values = cookie.split('; token=')
      console.log(`loaded cookie values: ${JSON.stringify(values)}`)
      if (values.length == 2) {
        const value = values[1]
        console.log(`loaded token: ${value}`)
        return value
      }
    }
  }
  return null
}
