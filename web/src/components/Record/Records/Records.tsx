import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Record/RecordsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteRecordMutationVariables, FindRecords } from 'types/graphql'

const DELETE_RECORD_MUTATION = gql`
  mutation DeleteRecordMutation($id: Int!) {
    deleteRecord(id: $id) {
      id
    }
  }
`

const RecordsList = ({ records }: FindRecords) => {
  const [deleteRecord] = useMutation(DELETE_RECORD_MUTATION, {
    onCompleted: () => {
      toast.success('Record deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteRecordMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete record ' + id + '?')) {
      deleteRecord({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Start</th>
            <th>End</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{truncate(record.id)}</td>
              <td>{timeTag(record.createdAt)}</td>
              <td>{timeTag(record.updatedAt)}</td>
              <td>{timeTag(record.start)}</td>
              <td>{timeTag(record.end)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.record({ id: record.id })}
                    title={'Show record ' + record.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRecord({ id: record.id })}
                    title={'Edit record ' + record.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete record ' + record.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(record.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecordsList
