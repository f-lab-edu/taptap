import type { FindCategoriesForTask } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import TaskForm from './TaskForm'
import { TaskFormProps } from './TaskForm.types'

export const QUERY = gql`
  query FindCategoriesForTask {
    categories {
      id
      title
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = (
  props: CellSuccessProps<FindCategoriesForTask> & TaskFormProps
) => <TaskForm {...props} />
