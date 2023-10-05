import {
  eachMinuteOfInterval,
  endOfToday,
  format,
  startOfToday,
} from 'date-fns'

export const timeFormat = (date: Date): string => format(date, 'HH:mm')

export const OPTIONS = eachMinuteOfInterval(
  {
    start: startOfToday(),
    end: endOfToday(),
  },
  { step: 10 }
)
