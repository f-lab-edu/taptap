import { addHours, format, roundToNearestMinutes } from 'date-fns'

export const OPTIONS = {
  color: [
    '#073b4c',
    '#005f73',
    '#94d2bd',
    '#0a9396',
    '#e9d8a6',
    '#ee9b00',
    '#ca6702',
    '#bb3e03',
    '#ae2012',
    '#9b2226',
    '#344e41',
    '#3a5a40',
    '#588157',
    '#a3b18a',
    '#dad7cd',
    '#cac5b8',
    '#98948a',
    '#65635c',
    '#33312e',
    '#000000',
  ],
  repeat: ['안함', '매일', '평일', '주말', '매주', '매월', '매년'] as const,
}

export const timeFormat = (date: Date): string => format(date, 'HH:mm')

export const getDefaultTimes = (): [Date, Date] => {
  const start = roundToNearestMinutes(new Date(), {
    nearestTo: 30,
    roundingMethod: 'ceil',
  })
  const end = addHours(start, 1)
  return [start, end]
}

export const defaultValues = {
  color: OPTIONS.color[0],
  startDate: new Date(),
  times: {
    allDay: true,
    data: [getDefaultTimes().map(timeFormat) as [string, string]],
  },
  repeat: {
    repeat: '안함' as const,
  },
}
