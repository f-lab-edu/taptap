import { useMemo } from 'react'

import { Box, Flex, HStack, Tag, Text } from '@chakra-ui/react'

import { formatDuration } from 'src/lib/formatters'

import Toolbox from '../Toolbox/Toolbox'

export interface TaskProps {
  id: number | string
  title: string
  color: string
  duration: Duration
}

const MENU = [
  {
    label: '수정',
    onClick: () => {},
  },
  {
    label: '삭제',
    onClick: () => {},
  },
]

const Task = ({ id, title, color, duration }: TaskProps) => {
  const { hours, minutes } = useMemo(() => formatDuration(duration), [duration])
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      w="full"
      gap="2"
      p="0"
    >
      <Box w="4px" h="28px" rounded="2px" bg={color} />
      <Text mr="auto">{title}</Text>
      <Tag size="sm" colorScheme="blackAlpha">{`${hours}h ${minutes}m`}</Tag>
      <Toolbox items={MENU} />
    </Flex>
  )
}

export default Task
