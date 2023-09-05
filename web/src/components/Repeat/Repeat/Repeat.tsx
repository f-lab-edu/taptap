import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, jsonDisplay, timeTag } from 'src/lib/formatters'

import type {
  DeleteRepeatMutationVariables,
  FindRepeatById,
} from 'types/graphql'

const DELETE_REPEAT_MUTATION = gql`
  mutation DeleteRepeatMutation($id: Int!) {
    deleteRepeat(id: $id) {
      id
    }
  }
`

interface Props {
  repeat: NonNullable<FindRepeatById['repeat']>
}

const Repeat = ({ repeat }: Props) => {
  const [deleteRepeat] = useMutation(DELETE_REPEAT_MUTATION, {
    onCompleted: () => {
      toast.success('Repeat deleted')
      navigate(routes.repeats())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteRepeatMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete repeat ' + id + '?')) {
      deleteRepeat({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Repeat {repeat.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{repeat.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(repeat.createdAt)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(repeat.updatedAt)}</td>
            </tr>
            <tr>
              <th>Start date</th>
              <td>{timeTag(repeat.startDate)}</td>
            </tr>
            <tr>
              <th>Start time</th>
              <td>{timeTag(repeat.startTime)}</td>
            </tr>
            <tr>
              <th>End date</th>
              <td>{timeTag(repeat.endDate)}</td>
            </tr>
            <tr>
              <th>End time</th>
              <td>{timeTag(repeat.endTime)}</td>
            </tr>
            <tr>
              <th>Type</th>
              <td>{formatEnum(repeat.type)}</td>
            </tr>
            <tr>
              <th>Interval</th>
              <td>{repeat.interval}</td>
            </tr>
            <tr>
              <th>Days of month</th>
              <td>{jsonDisplay(repeat.daysOfMonth)}</td>
            </tr>
            <tr>
              <th>Week of month</th>
              <td>{formatEnum(repeat.weekOfMonth)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editRepeat({ id: repeat.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(repeat.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Repeat
