import type { EditRepeatById, UpdateRepeatInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RepeatForm from 'src/components/Repeat/RepeatForm'

export const QUERY = gql`
  query EditRepeatById($id: Int!) {
    repeat: repeat(id: $id) {
      id
      createdAt
      updatedAt
      startDate
      endDate
      type
      interval
      daysOfMonth
      weekOfMonth
      taskId
    }
  }
`
const UPDATE_REPEAT_MUTATION = gql`
  mutation UpdateRepeatMutation($id: Int!, $input: UpdateRepeatInput!) {
    updateRepeat(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      startDate
      endDate
      type
      interval
      daysOfMonth
      weekOfMonth
      taskId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ repeat }: CellSuccessProps<EditRepeatById>) => {
  const [updateRepeat, { loading, error }] = useMutation(
    UPDATE_REPEAT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Repeat updated')
        navigate(routes.repeats())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateRepeatInput,
    id: EditRepeatById['repeat']['id']
  ) => {
    updateRepeat({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Repeat {repeat?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RepeatForm
          repeat={repeat}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
