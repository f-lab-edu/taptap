import { TypedDocumentNode } from '@apollo/client'
import { records, recordsVariables } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

const GET_RECORDS: TypedDocumentNode<records, recordsVariables> = gql`
  query records($date: DateTime, $taskId: Int) {
    records(date: $date, taskId: $taskId) {
      duration {
        hours
        minutes
        seconds
      }
      list {
        id
        start
        end
      }
    }
  }
`

const useRecords = (variables: recordsVariables) => {
  return useSuspenseQuery(GET_RECORDS, {
    variables,
  })
}

export default useRecords
