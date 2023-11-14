import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  addDays,
  startOfDay,
  differenceInMilliseconds,
  addHours,
} from 'date-fns'

interface TodayContextType {
  today: Date
  customStartOfDay: (date: Date) => Date
  offset: number
  setOffset: (hour: number) => void
}

const DEFAULT_OFFSET = 4 // 하루의 시작은 4시. 추후 사용자 설정 가능
const TodayContext = createContext<null | TodayContextType>(null)

export const TodayContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [offset, setOffset] = useState(DEFAULT_OFFSET)
  const customStartOfDay = useCallback(
    (date: Date) => addHours(startOfDay(date), offset),
    [offset]
  )

  const [today, setToday] = useState(customStartOfDay(new Date()))
  useEffect(() => {
    const tomorrow = customStartOfDay(addDays(today, 1))
    const delay = differenceInMilliseconds(tomorrow, today)
    const id = setTimeout(() => setToday(tomorrow), delay)
    return () => clearTimeout(id)
  }, [today, customStartOfDay])

  const value = useMemo(
    () => ({ today, customStartOfDay, offset, setOffset }),
    [today, offset, customStartOfDay]
  )

  return <TodayContext.Provider value={value}>{children}</TodayContext.Provider>
}

const useToday = () => useContext(TodayContext)

export default useToday
