import '@styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

import { Head } from '@components/Head'
import { Layout } from '@components/Layout'
import { persistor, store } from '@redux/store'
import { PageType } from '@types'
import { theme } from '@utils/theme'

import type { AppProps } from 'next/app'
type AppPropsWithLayout = AppProps & {
  Component: PageType
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = (page: ReactElement) => (Component.noLayout ? page : <Layout>{page}</Layout>)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Head />
          {getLayout(<Component {...pageProps} />)}

          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
