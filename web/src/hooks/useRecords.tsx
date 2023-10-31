import { TypedDocumentNode } from '@apollo/client'
import { startOfDay } from 'date-fns'
import { records, recordsVariables } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

export const GET_RECORDS: TypedDocumentNode<records, recordsVariables> = gql`
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
        task {
          title
          color
        }
      }
    }
  }
`

interface Variables {
  date?: Date
  taskId?: number
}

const useRecords = ({ date = new Date(), taskId } = {} as Variables) => {
  return useSuspenseQuery(GET_RECORDS, {
    variables: { date: startOfDay(date), taskId },
    returnPartialData: true,
  })
}

export default useRecords
