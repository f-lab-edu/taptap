import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Repeat/RepeatsCell'
import { formatEnum, jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteRepeatMutationVariables, FindRepeats } from 'types/graphql'

const DELETE_REPEAT_MUTATION = gql`
  mutation DeleteRepeatMutation($id: Int!) {
    deleteRepeat(id: $id) {
      id
    }
  }
`

const RepeatsList = ({ repeats }: FindRepeats) => {
  const [deleteRepeat] = useMutation(DELETE_REPEAT_MUTATION, {
    onCompleted: () => {
      toast.success('Repeat deleted')
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

  const onDeleteClick = (id: DeleteRepeatMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete repeat ' + id + '?')) {
      deleteRepeat({ variables: { id } })
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
            <th>Start date</th>
            <th>Start time</th>
            <th>End date</th>
            <th>End time</th>
            <th>Type</th>
            <th>Interval</th>
            <th>Days of month</th>
            <th>Week of month</th>
            <th>Task id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {repeats.map((repeat) => (
            <tr key={repeat.id}>
              <td>{truncate(repeat.id)}</td>
              <td>{timeTag(repeat.createdAt)}</td>
              <td>{timeTag(repeat.updatedAt)}</td>
              <td>{timeTag(repeat.startDate)}</td>
              <td>{timeTag(repeat.startTime)}</td>
              <td>{timeTag(repeat.endDate)}</td>
              <td>{timeTag(repeat.endTime)}</td>
              <td>{formatEnum(repeat.type)}</td>
              <td>{truncate(repeat.interval)}</td>
              <td>{jsonTruncate(repeat.daysOfMonth)}</td>
              <td>{formatEnum(repeat.weekOfMonth)}</td>
              <td>{truncate(repeat.taskId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.repeat({ id: repeat.id })}
                    title={'Show repeat ' + repeat.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRepeat({ id: repeat.id })}
                    title={'Edit repeat ' + repeat.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete repeat ' + repeat.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(repeat.id)}
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

export default RepeatsList
