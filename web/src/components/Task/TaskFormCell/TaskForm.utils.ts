import { addHours, roundToNearestMinutes } from 'date-fns'

export const getDefaultTimes = (): [Date, Date] => {
  const start = roundToNearestMinutes(new Date(), {
    nearestTo: 30,
    roundingMethod: 'ceil',
  })
  const end = addHours(start, 1)
  return [start, end]
}
