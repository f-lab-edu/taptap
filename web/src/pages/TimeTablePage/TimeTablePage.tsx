import { Suspense } from 'react'

import { Flex } from '@chakra-ui/react'

import { DateField, FormProvider, useForm } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

// import TimeTableHeader from 'src/components/TimeTable/components/TimeTableHeader'
import TaskList from 'src/components/TaskList/TaskList'
import TimeTable from 'src/components/TimeTable/TimeTable'
import useToday from 'src/hooks/useToday'

/**
 *
 * @ 페이지 구조
 * - main
 *   - header: 날짜 선택
 *   - section: 타임테이블 (계획, 기록)
 *   - section: <선택 날짜>에 대한 할 일 목록
 */

interface TimeTablePageContext {
  date: Date
}

const TimeTablePage = () => {
  const { today } = useToday()
  const context = useForm<TimeTablePageContext>({
    defaultValues: {
      date: today,
    },
  })
  const { register } = context

  return (
    <>
      <MetaTags title="TimeTable" description="TimeTable page" />
      <FormProvider {...context}>
        <main>
          <header>
            <DateField {...register('date')} />
          </header>
          <Suspense fallback={<div>loading...</div>}>
            <Flex as="section" h="full" justifyContent="center" gap="4">
              <div className="rounded-lg bg-white px-7 py-5 shadow-sm">
                <TimeTable />
              </div>
              <div className="rounded-lg bg-white px-7 py-5 shadow-sm">
                <TaskList />
              </div>
            </Flex>
          </Suspense>
        </main>
      </FormProvider>
    </>
  )
}

export default TimeTablePage
