import React from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

import 'normalize.css/normalize.css'
import GlobalStyles from '@/GlobalStyles'

import AppHeader from '@/components/appCommon/AppHeader'

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyles />

      <AppHeader />
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default App
