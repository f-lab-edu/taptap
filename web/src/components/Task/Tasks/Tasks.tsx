import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Task/TasksCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteTaskMutationVariables, FindTasks } from 'types/graphql'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const TasksList = ({ tasks }: FindTasks) => {
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
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

  const onDeleteClick = (id: DeleteTaskMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
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
            <th>Title</th>
            <th>Color</th>
            <th>Description</th>
            <th>Category id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{truncate(task.id)}</td>
              <td>{timeTag(task.createdAt)}</td>
              <td>{timeTag(task.updatedAt)}</td>
              <td>{truncate(task.title)}</td>
              <td>{truncate(task.color)}</td>
              <td>{truncate(task.description)}</td>
              <td>{truncate(task.categoryId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.task({ id: task.id })}
                    title={'Show task ' + task.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTask({ id: task.id })}
                    title={'Edit task ' + task.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete task ' + task.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(task.id)}
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

export default TasksList
