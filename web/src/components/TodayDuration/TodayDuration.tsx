import React, { useMemo } from 'react'

import { VStack } from '@chakra-ui/react'
import { format, startOfDay } from 'date-fns'
import { ko } from 'date-fns/locale'

import useRecords from 'src/hooks/useRecords'
import { formatDuration } from 'src/lib/formatters'

const TodayDuration = () => {
  const today = useMemo(() => startOfDay(new Date()), [])
  const {
    data: {
      records: { duration },
    },
  } = useRecords({
    date: today.toISOString(),
  })
  return (
    <VStack spacing="1">
      <p className="font-medium text-slate-500">
        {format(today, 'yyyy. MM. dd. eee', { locale: ko })}
      </p>
      <p className="text-6xl text-slate-900">{formatDuration(duration)}</p>
    </VStack>
  )
}

export default TodayDuration
