import React, { useMemo } from 'react'

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

import useRecords from 'src/hooks/useRecords'
import { formatDuration } from 'src/lib/formatters'

const TodayDuration = () => {
  const today = useMemo(() => new Date(), [])
  const {
    data: {
      records: { duration },
    },
  } = useRecords({
    date: today.toISOString(),
  })
  return (
    <div>
      <p>{format(today, 'yyyy. MM. dd. eee', { locale: ko })}</p>
      <p>{formatDuration(duration)}</p>
    </div>
  )
}

export default TodayDuration
