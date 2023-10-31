import { useMemo } from 'react'

import {
  Box,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  addHours,
  eachHourOfInterval,
  endOfDay,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  startOfDay,
} from 'date-fns'

import { MetaTags } from '@redwoodjs/web'

const START_OF_DAY = 4
const TimeTablePage = () => {
  // 1. 24시간 tr 생성
  // - useToday
  // - 하루 시작 시간: 지금은 상수, 나중엔 설정가능?
  // mock data => 데이터 block 출력

  const today = useMemo(() => new Date(), [])
  const rowTimes = useMemo(
    () =>
      eachHourOfInterval({
        start: addHours(startOfDay(today), START_OF_DAY),
        end: addHours(endOfDay(today), START_OF_DAY),
      }),
    [today]
  )

  const blockMap = getTimeBlockProps([
    { start, end, title: '알고리즘 문제풀이', color: 'teal.500' },
  ])
  return (
    <>
      <MetaTags title="TimeTable" description="TimeTable page" />
      <main>
        <h1>TimeTablePage</h1>
        <Center>
          <Table width="500px" size="sm">
            <Thead>
              <Tr>
                <Th></Th>
                <Th textAlign="center">Plan</Th>
                <Th textAlign="center">Record</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rowTimes.map((time) => {
                const hour = getHours(time)
                return (
                  <Tr key={hour}>
                    <Th isNumeric w="10px" p="0">
                      {hour}
                    </Th>
                    <Td w="45%" p="0" position="relative" h="25px"></Td>
                    <Td w="45%" p="0" position="relative" h="25px">
                      {blockMap[hour].map((props) => (
                        <TimeBlock key={`${hour} ${props.start}`} {...props} />
                      ))}
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Center>
      </main>
    </>
  )
}

interface TimeBlockProps {
  title: string
  color: string
  start: number
  duration: number
}

// TODO: title 말줄임
const TimeBlock = ({ title, color, start, duration }: TimeBlockProps) => {
  return (
    <Box
      position="absolute"
      bg={color}
      top="0.5"
      bottom="0.5"
      borderRadius="sm"
      left={`${(start / 60) * 100}%`}
      w={`${(duration / 60) * 100}%`}
    >
      {title}
    </Box>
  )
}

const start = setMinutes(setHours(new Date(), 9), 50),
  end = setMinutes(setHours(new Date(), 11), 10)

interface BlockMap {
  [hour: number]: TimeBlockProps[]
}

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

export default TimeTablePage
