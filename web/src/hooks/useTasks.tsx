import { TypedDocumentNode } from '@apollo/client'
import { startOfDay } from 'date-fns'
import { tasks as Tasks } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

export const GET_TASKS: TypedDocumentNode<Tasks, TasksVariables> = gql`
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

interface TasksVariables {
  date?: Date
}

const useTasks = ({ date }: TasksVariables) =>
  useSuspenseQuery(GET_TASKS, {
    variables: { date: startOfDay(date) },
  })

export default useTasks
