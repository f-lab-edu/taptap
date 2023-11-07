import { useMemo } from 'react'

import { Flex, Tag, Text } from '@chakra-ui/react'
import { tasks as TasksType } from 'types/graphql'

import { useFormContext } from '@redwoodjs/forms'

import useTasks from 'src/hooks/useTasks'
import { intervalListToDuration } from 'src/lib/formatters'

import Task, { TaskProps } from './components/Task/Task'

interface TaskGroup {
  title: string
  color: string
  tasks: TaskProps[]
}

interface Props {
  list: TaskGroup[]
}

// 카테고리별 total duration 계산
// 카테고리 총 duration 요소의 background
// - color는 tasks 중 하나 가져오기 (아무거나? 첫번째?)
// - opacity
const TaskList = () => {
  const { watch } = useFormContext()
  const { date } = watch()
  const {
    data: { tasks },
  } = useTasks({ date })

  const tasksByCategory = useMemo(() => groupTasksByCategory(tasks), [tasks])

  return (
    <div className="flex flex-col gap-3">
      {Object.values(tasksByCategory).map(({ title, tasks }) => (
        <div key={title}>
          <Flex
            as="header"
            alignItems="center"
            justifyContent="space-between"
            mb="2"
            pr="5"
          >
            <Text fontWeight="bold">{title}</Text>
            <Tag size="sm" bg={tasks[0].color}>
              0h 00m
            </Tag>
          </Flex>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <Task {...task} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default TaskList

const groupTasksByCategory = (
  tasks: TasksType['tasks']
): { [key: number]: Omit<TaskGroup, 'color'> } => {
  const group = {}

  tasks.forEach(({ categoryId, category, records, ...task }) => {
    const duration = intervalListToDuration(records)

    if (!(categoryId in group)) {
      group[categoryId] = { ...category, tasks: [{ ...task, duration }] }
    } else {
      group[categoryId].tasks.push({ ...task, duration })
    }
  })

  return group
}
