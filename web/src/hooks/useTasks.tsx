import { TypedDocumentNode } from '@apollo/client'
import { startOfDay } from 'date-fns'
import { tasks as Tasks, tasksVariables } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

export const GET_TASKS: TypedDocumentNode<Tasks, tasksVariables> = gql`
  query tasks($date: DateTime) {
    tasks(date: $date) {
      id
      title
      color
      times
      categoryId
      category {
        id
        title
      }
      records {
        id
        start
        end
      }
    }
  }
`

interface Variables {
  date?: Date
}

const useTasks = ({ date = new Date() } = {} as Variables) =>
  useSuspenseQuery(GET_TASKS, {
    variables: { date },
  })

export default useTasks
