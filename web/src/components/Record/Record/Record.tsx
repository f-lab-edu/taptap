import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

import type {
  DeleteRecordMutationVariables,
  FindRecordById,
} from 'types/graphql'

const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecordMutation($id: Int!) {
    deleteRecord(id: $id) {
      id
    }
  }
`

interface Props {
  record: NonNullable<FindRecordById['record']>
}

const Record = ({ record }: Props) => {
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION, {
    onCompleted: () => {
      toast.success('Record deleted')
      navigate(routes.records())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRecordMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete record ' + id + '?')) {
      deleteRecord({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Record {record.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{record.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(record.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(record.updatedAt)}</td>
            </tr>
            <tr>
              <th>Start</th>
              <td>{timeTag(record.start)}</td>
            </tr>
            <tr>
              <th>End</th>
              <td>{timeTag(record.end)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRecord({ id: record.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(record.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Record
