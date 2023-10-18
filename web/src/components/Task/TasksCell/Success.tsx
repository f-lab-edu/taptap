import type { FindTasks } from 'types/graphql'
import type { CellSuccessProps } from '@redwoodjs/web'
import Tasks from 'src/components/Task/Tasks'

export const Success = ({ tasks }: CellSuccessProps<FindTasks>) => {
  return
  ;<Tasks tasks={tasks.today} />
}
