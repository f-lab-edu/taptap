import React, { memo, useEffect, useMemo, useState } from 'react'

import { intervalToDuration } from 'date-fns'

interface Props {
  start: Date
}

const Timer = ({ start }: Props) => {
  const [end, setEndTime] = useState(new Date())

  useEffect(() => {
    setInterval(() => setEndTime(new Date()), 1000)
  }, [])

  const { hours, minutes, seconds } = useMemo(
    () => intervalToDuration({ start, end }),
    [start, end]
  )

  useEffect(() => {
    console.log('end:', end)
  }, [end])

  return <p>{`${hours}:${minutes}:${seconds}`}</p>
}

export default memo(Timer)
