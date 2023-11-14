import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import * as theme from 'config/chakra.config'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo/suspense'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'
import './index.css'
import './scaffold.css'
import 'react-day-picker/dist/style.css'
import { cacheConfig, typeDefs } from './graphql/config'
import { TodayContextProvider } from './hooks/useToday'

const extendedTheme = extendTheme(theme)

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <ColorModeScript />
      <ChakraProvider theme={extendedTheme}>
        <AuthProvider>
          <RedwoodApolloProvider
            useAuth={useAuth}
            graphQLClientConfig={{
              connectToDevTools: true,
              cacheConfig,
              typeDefs,
            }}
          >
            <TodayContextProvider>
              <Routes />
            </TodayContextProvider>
          </RedwoodApolloProvider>
        </AuthProvider>
      </ChakraProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
