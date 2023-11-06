import { Flex, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

import Task, { TaskProps } from '../Task/Task'

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
const TaskList = ({ list }: Props) => (
  <div className="flex w-full flex-col gap-3 bg-yellow-50">
    {list.map(({ title, color, tasks }) => (
      <div key={title}>
        <Flex
          as="header"
          alignItems="center"
          justifyContent="space-between"
          mb="2"
          pr="5"
        >
          <Text fontWeight="bold">{title}</Text>
          <Tag size="sm" bg={color}>
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

export default TaskList
