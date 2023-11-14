import { TypedDocumentNode } from '@apollo/client'
import { tasks as Tasks, tasksVariables as TaskVariables } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'
// FIXME: types
export const GET_TASKS: TypedDocumentNode<Tasks, TaskVariables> = gql`
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
  date: Date
}

// TODO: enable to get options
const useTasks = ({ date }: Variables) =>
  useSuspenseQuery(GET_TASKS, {
    variables: { date: date.toISOString() },
  })

export default useTasks
