import { useMemo } from 'react'

import { Box, Flex, HStack, Tag, Text } from '@chakra-ui/react'

import { formatDuration } from 'src/lib/formatters'

import Toolbox from '../Toolbox/Toolbox'

interface Props {
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

const Task = ({ id, title, color, duration }: Props) => {
  const { hours, minutes } = useMemo(() => formatDuration(duration), [duration])
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <HStack spacing="2">
        <Box w="4px" h="28px" rounded="2px" bg={color} />
        <Text>{title}</Text>
      </HStack>
      <HStack spacing="2">
        <Tag size="sm" colorScheme="blackAlpha">{`${hours}h ${minutes}m`}</Tag>
        <Toolbox items={MENU} />
      </HStack>
    </Flex>
  )
}

export default Task
