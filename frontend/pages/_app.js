import App from 'next/app'
import { Provider } from 'react-redux'
import React from 'react'
import withReduxStore from 'lib/redux/with-redux-store'

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Component {...pageProps} />
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
