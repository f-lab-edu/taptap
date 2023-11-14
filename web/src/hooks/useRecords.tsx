import { TypedDocumentNode } from '@apollo/client'
import { records, recordsVariables } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

export const GET_RECORDS: TypedDocumentNode<records, recordsVariables> = gql`
  query records($date: DateTime, $taskId: Int) {
    records(date: $date, taskId: $taskId) {
      id
      start
      end
      task {
        id
        title
        color
      }
    }
  }
`

interface Variables {
  date: Date
  taskId?: number
}

const useRecords = ({ date, taskId } = {} as Variables) => {
  return useSuspenseQuery(GET_RECORDS, {
    variables: { date: date.toISOString(), taskId },
    returnPartialData: true,
  })
}

export default useRecords
