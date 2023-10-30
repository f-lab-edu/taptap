import React, { memo, useEffect, useMemo, useState } from 'react'

import { intervalToDuration } from 'date-fns'

import { useFormContext, useWatch } from '@redwoodjs/forms'

import { formatDuration } from 'src/lib/formatters'

const Timer = () => {
  const { control } = useFormContext()
  const start = useWatch({ control, name: 'start' })
  const [end, setEndTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setEndTime(new Date()), 1000)
    return () => clearInterval(interval)
  })

  const duration = useMemo(
    () => intervalToDuration({ start, end }),
    [start, end]
  )

  return <p className="text-6xl">{formatDuration(duration)}</p>
}

export default memo(Timer)
