import type { EditRecordById, UpdateRecordInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RecordForm from 'src/components/Record/RecordForm'

export const QUERY = gql`
  query EditRecordById($id: Int!) {
    record: record(id: $id) {
      id
      createdAt
      updatedAt
      start
      end
      taskId
    }
  }
`
const UPDATE_RECORD_MUTATION = gql`
  mutation UpdateRecordMutation($id: Int!, $input: UpdateRecordInput!) {
    updateRecord(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      start
      end
      taskId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ record }: CellSuccessProps<EditRecordById>) => {
  const [updateRecord, { loading, error }] = useMutation(
    UPDATE_RECORD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Record updated')
        navigate(routes.records())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateRecordInput,
    id: EditRecordById['record']['id']
  ) => {
    updateRecord({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Record {record?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RecordForm
          record={record}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
