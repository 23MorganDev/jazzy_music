import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import Theme from './theme/Theme.js'
import { store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <ChakraProvider
          theme={Theme}
          toastOptions={{
            defaultOptions: {
              position: "top",
              duration: 3000,
              variant: "subtle",
              containerStyle: { fontSize: 14 },
            },
          }}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
