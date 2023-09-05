import TaskCell from 'src/components/Task/TaskCell'

type TaskPageProps = {
  id: number
}

const TaskPage = ({ id }: TaskPageProps) => {
  return <TaskCell id={id} />
}

export default TaskPage
