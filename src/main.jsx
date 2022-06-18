import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BlockchainProvider } from './context/BlockchainContext'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import { extendTheme } from '@chakra-ui/react'
const colors = {
  brand: {
    900: '#57a1d9',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlockchainProvider>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
  </BlockchainProvider>
)
