import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RecordForm from 'src/components/Record/RecordForm'

import type { CreateRecordInput } from 'types/graphql'

const CREATE_RECORD_MUTATION = gql`
  mutation CreateRecordMutation($input: CreateRecordInput!) {
    createRecord(input: $input) {
      id
    }
  }
`

const NewRecord = () => {
  const [createRecord, { loading, error }] = useMutation(
    CREATE_RECORD_MUTATION,
    {
      onCompleted: () => {
        toast.success('Record created')
        navigate(routes.records())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateRecordInput) => {
    createRecord({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Record</h2>
      </header>
      <div className="rw-segment-main">
        <RecordForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRecord
