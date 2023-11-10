import { eachMinuteOfInterval, endOfToday, set, startOfToday } from 'date-fns'

export const getTimeOptions = ({
  start = startOfToday(),
  end = endOfToday(),
} = {}) =>
  eachMinuteOfInterval(
    {
      start,
      end,
    },
    { step: 10 }
  )

// @str hh:mm
export const timestringToDate = (str) => {
  const [hours, minutes] = str.split(':').map(Number)
  return set(new Date(), { hours, minutes })
}
