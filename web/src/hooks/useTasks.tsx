import { TypedDocumentNode } from '@apollo/client'
import { startOfDay } from 'date-fns'
import { tasks as Tasks, tasksVariables as TaskVariables } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'
// FIXME: types
export const GET_TASKS: TypedDocumentNode<Tasks, TaskVariables> = gql`
  query tasks($date: DateTime) {
    tasks(date: $date) {
      id
      title
      color
      category {
        title
      }
    }
  }
`

interface Variables {
  date?: Date
}

// FIXME: default date = today (useToday)
// TODO: enable to get options
const useTasks = ({ date = startOfDay(new Date()) } = {} as Variables) =>
  useSuspenseQuery(GET_TASKS, {
    variables: { date: date.toISOString() },
  })

export default useTasks
