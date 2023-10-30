import React, { memo } from 'react'

import { VStack } from '@chakra-ui/react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

import useRecords from 'src/hooks/useRecords'
import { formatDuration } from 'src/lib/formatters'

const TodayDuration = () => {
  const {
    data: {
      records: { duration },
    },
  } = useRecords()
  return (
    <VStack spacing="1">
      <p className="font-medium text-slate-500">
        {format(new Date(), 'yyyy. MM. dd. eee', { locale: ko })}
      </p>
      <p className="text-6xl text-slate-900">{formatDuration(duration)}</p>
    </VStack>
  )
}

export default memo(TodayDuration)
