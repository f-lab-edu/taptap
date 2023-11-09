import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import * as theme from 'config/chakra.config'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo/suspense'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'

// import './scaffold.css'
import './index.css'
import 'react-day-picker/dist/style.css'
import { intervalListToDuration, Interval } from './lib/formatters'

const extendedTheme = extendTheme(theme)

const clientSchema = gql`
  type Duration {
    hours: Int
    minutes: Int
    seconds: Int
    milliseconds: Int
  }

  extend type Task {
    date: String!
    duration: Duration
  }
`

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
              cacheConfig: {
                typePolicies: {
                  // Query: {
                  //   fields: {
                  //     duration: {
                  //       read(_, { readField, cache }) {
                  //         return { hours: 0 }
                  //       },
                  //     },
                  //   },
                  // },
                  Task: {
                    keyFields: ['id', 'date'],
                    fields: {
                      date: {
                        read(_, { variables }) {
                          return variables.date
                        },
                      },
                      duration: {
                        read(_, { readField }) {
                          const recordRefs = readField('records')
                          const records = (
                            recordRefs && Array.isArray(recordRefs)
                              ? recordRefs.map((ref) => ({
                                  start: readField('start', ref),
                                  end: readField('end', ref),
                                }))
                              : []
                          ) as Interval[]
                          return intervalListToDuration(records)
                        },
                      },
                    },
                  },
                },
              },
              typeDefs: clientSchema,
            }}
          >
            <Routes />
          </RedwoodApolloProvider>
        </AuthProvider>
      </ChakraProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
