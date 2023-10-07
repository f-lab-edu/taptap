import { addHours, roundToNearestMinutes } from 'date-fns'

export const getDefaultTimes = (): [Date, Date] => {
  const start = roundToNearestMinutes(new Date(), {
    nearestTo: 30,
    roundingMethod: 'ceil',
  })
  const end = addHours(start, 1)
  return [start, end]
}

export const repeatSelectValue = {
  안함: null,
  매일: { type: 'Daily', interval: 1 },
  평일: { type: 'Weekly', interval: 1 },
  주말: { type: 'Weekly', interval: 1 },
  매주: { type: 'Weekly', interval: 1 },
  매월: { type: 'Monthly', interval: 1 },
  매년: { type: 'Yearly', interval: 1 },
}

export const COLOR_PALETTE = [
  { value: '#073b4c' },
  { value: '#005f73' },
  { value: '#0a9396' },
  { value: '#94d2bd' },
  { value: '#e9d8a6' },
  { value: '#ee9b00' },
  { value: '#ca6702' },
  { value: '#bb3e03' },
  { value: '#ae2012' },
  { value: '#9b2226' },
  { value: '#344e41' },
  { value: '#3a5a40' },
  { value: '#588157' },
  { value: '#a3b18a' },
  { value: '#dad7cd' },
  { value: '#cac5b8' },
  { value: '#98948a' },
  { value: '#65635c' },
  { value: '#33312e' },
  { value: '#000000' },
]

export const REPEAT_OPTIONS = [
  '안함',
  '매일',
  '평일',
  '주말',
  '매주',
  '매월',
  '매년',
] as const

// TODO: 이게 더 나을까
const options = {
  color: [],
  repeat: [],
}
