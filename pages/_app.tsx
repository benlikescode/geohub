import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Navbar } from '../components/Navbar'
import { Provider, Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { config } from '../utils/firebaseConfig'
import { initializeApp } from 'firebase/app'

function MyApp({ Component, pageProps }: AppProps) {

  const firebaseApp = initializeApp(config)

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider> 
  )
}
export default MyApp
