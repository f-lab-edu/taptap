import { Suspense } from 'react'

import { Box, Center } from '@chakra-ui/react'

import { MetaTags } from '@redwoodjs/web'

import TimeTable from 'src/components/TimeTable/TimeTable'

const TimeTablePage = () => {
  // 1. 24시간 tr 생성
  // - useToday
  // - 하루 시작 시간: 지금은 상수, 나중엔 설정가능?
  // const {data: {records}} = useRecords()

  return (
    <>
      <MetaTags title="TimeTable" description="TimeTable page" />
      <Suspense fallback={<div>loading...</div>}>
        <Center as="main" bg="white" h="full">
          <TimeTable />
        </Center>
      </Suspense>
    </>
  )
}

export default TimeTablePage
