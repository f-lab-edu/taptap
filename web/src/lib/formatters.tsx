import React from 'react'

import {
  Duration,
  addMilliseconds,
  getTime,
  intervalToDuration,
} from 'date-fns'
import humanize from 'humanize-string'

const MAX_STRING_LENGTH = 150

export const formatEnum = (values: string | string[] | null | undefined) => {
  let output = ''

  if (Array.isArray(values)) {
    const humanizedValues = values.map((value) => humanize(value))
    output = humanizedValues.join(', ')
  } else if (typeof values === 'string') {
    output = humanize(values)
  }

  return output
}

export const jsonDisplay = (obj: unknown) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

export const truncate = (value: string | number) => {
  let output = value?.toString() ?? ''

  if (output.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }

  return output
}

export const jsonTruncate = (obj: unknown) => {
  return truncate(JSON.stringify(obj, null, 2))
}

export const timeTag = (dateTime?: string) => {
  let output: string | JSX.Element = ''

  if (dateTime) {
    output = (
      <time dateTime={dateTime} title={dateTime}>
        {new Date(dateTime).toUTCString()}
      </time>
    )
  }

  return output
}

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}

const NEEDED = ['hours', 'minutes', 'seconds'] as const
type FormattedDurationString = {
  [key in (typeof NEEDED)[number]]: string
}

export const formatDuration = (duration: Duration): FormattedDurationString => {
  const formatted = {} as FormattedDurationString
  for (const key of NEEDED) {
    const value = (duration[key] || 0).toString().padStart(2, '0')
    formatted[key] = value
  }
  return formatted
}

export interface Interval {
  start: Date | string | number
  end: Date | string | number
}
export const intervalListToDuration = (intervals = [] as Interval[]) => {
  const sum = intervals.reduce((acc, { start, end }) => {
    const duration = getTime(new Date(end)) - getTime(new Date(start))
    return acc + duration
  }, 0)
  const now = new Date()
  return intervalToDuration({ start: now, end: addMilliseconds(now, sum) })
}
