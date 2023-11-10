import { createFragmentRegistry } from '@apollo/client/cache'
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import * as theme from 'config/chakra.config'
import { records as RecordsType } from 'types/graphql'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/dist/apollo/suspense'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import { AuthProvider, useAuth } from './auth'
import './index.css'
import 'react-day-picker/dist/style.css'
import { TASK_DURATION } from './graphql/duration'
import { TodayContextProvider } from './hooks/useToday'
import {
  intervalListToDuration,
  Interval,
  formatDuration,
} from './lib/formatters'

const extendedTheme = extendTheme(theme)

const clientSchema = gql`
  type Duration {
    hours: Int
    minutes: Int
    seconds: Int
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
                  Query: {
                    fields: {
                      duration: {
                        read(_, { cache, variables: { date } }) {
                          // FIXME: records fields -> fragment
                          const data = cache.readQuery({
                            query: gql`
                              query records($date: DateTime) {
                                records(date: $date) {
                                  id
                                  start
                                  end
                                }
                              }
                            `,
                            variables: {
                              date,
                            },
                          }) as RecordsType
                          const records = data?.records
                          return formatDuration(intervalListToDuration(records))
                        },
                      },
                    },
                  },
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
                fragments: createFragmentRegistry(TASK_DURATION),
              },
              typeDefs: clientSchema,
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
