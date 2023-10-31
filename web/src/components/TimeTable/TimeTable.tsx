import React, { useMemo } from 'react'

import {
  Box,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react'
import {
  addHours,
  eachHourOfInterval,
  endOfDay,
  format,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  startOfDay,
} from 'date-fns'

import useRecords from 'src/hooks/useRecords'
import useTasks from 'src/hooks/useTasks'
import { formatDuration } from 'src/lib/formatters'

const START_OF_DAY = 4
const TimeTable = () => {
  const {
    data: { records },
  } = useRecords()

  const {
    data: { tasks },
  } = useTasks()

  const today = useMemo(() => new Date(), [])
  const rowTimes = useMemo(
    () =>
      eachHourOfInterval({
        start: addHours(startOfDay(today), START_OF_DAY),
        end: addHours(endOfDay(today), START_OF_DAY),
      }),
    [today]
  )

  const planBlockMap = useMemo(
    () =>
      getTimeBlockProps(
        tasks
          .filter(({ times }) => times)
          .flatMap(({ title, color, times }) => {
            return times.map(([startTime, endTime]) => {
              const [sh, sm] = startTime.split(':')
              const [eh, em] = endTime.split(':')
              const start = setMinutes(setHours(new Date(), sh), sm)
              const end = setMinutes(setHours(new Date(), eh), em)
              return { title, color, start, end }
            })
          })
      ),
    [tasks]
  )
  const recordBlockMap = useMemo(
    () =>
      getTimeBlockProps(
        records.list.map(({ start, end, task: { title, color } }) => ({
          start: new Date(start),
          end: new Date(end),
          title,
          color,
        }))
      ),
    [records]
  )

  return (
    <Table width="500px" size="sm">
      <Thead>
        <Tr>
          <Th></Th>
          <Th textAlign="center">Plan</Th>
          <Th textAlign="center" fontWeight="medium">
            <VStack spacing="2">
              <Text color="gray.500">Record</Text>
              <Text fontSize="2xl" fontWeight="semibold">
                {formatDuration(records.duration)}
              </Text>
            </VStack>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {rowTimes.map((time) => {
          const hour = getHours(time)
          return (
            <Tr key={hour}>
              <Th w="10px" p="0">
                {format(time, 'HH')}
              </Th>
              <Td w="45%" p="0" position="relative" h="25px">
                {planBlockMap[hour].map((props) => (
                  <TimeBlock key={`${hour} ${props.start}`} {...props} />
                ))}
              </Td>
              <Td w="45%" p="0" position="relative" h="25px">
                {recordBlockMap[hour].map((props) => (
                  <TimeBlock key={`${hour} ${props.start}`} {...props} />
                ))}
              </Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default TimeTable

interface TimeBlockProps {
  title: string
  color: string
  start: number
  duration: number
}

interface BlockMap {
  [hour: number]: TimeBlockProps[]
}

// TODO: title 텍스트 처리
const TimeBlock = ({ title, color, start, duration }: TimeBlockProps) => (
  <Box
    position="absolute"
    bg={color}
    top="0.5"
    bottom="0.5"
    borderRadius="base"
    left={`${(start / 60) * 100}%`}
    w={`${(duration / 60) * 100}%`}
    whiteSpace="nowrap"
    overflow="hidden"
    textOverflow="ellipsis"
    color="white"
    px="2"
  >
    {title}
  </Box>
)

const getTimeBlockProps = function (
  items: { title: string; color: string; start: Date; end: Date }[]
): BlockMap {
  const handler = {
    get(target, name) {
      if (!(name in target)) {
        target[name] = []
      }
      return target[name]
    },
  }

  const blocks = new Proxy({}, handler)

  items.forEach(({ start: s, end: e, ...rest }) => {
    const start = {
      hour: getHours(s),
      minute: getMinutes(s),
    }
    const end = {
      hour: getHours(e),
      minute: getMinutes(e),
    }

    let block_start = start.minute

    for (let h = start.hour; h < end.hour; h++) {
      blocks[h].push({
        ...rest,
        start: block_start,
        duration: 60 - block_start,
      })
      block_start = 0
    }

    // h = end.hour
    blocks[end.hour].push({
      ...rest,
      start: block_start,
      duration: end.minute - block_start,
    })
  })

  return blocks
}
