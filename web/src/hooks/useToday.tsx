import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { addDays, differenceInMilliseconds, sub, set } from 'date-fns'

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
    // 하루의 시작 시간으로 맞춤
    (date: Date) =>
      set(date, {
        hours: offset,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
    [offset]
  )

  const [today, setToday] = useState(
    customStartOfDay(sub(new Date(), { hours: DEFAULT_OFFSET }))
  )
  useEffect(() => {
    const tomorrow = customStartOfDay(addDays(today, 1))
    const delay = differenceInMilliseconds(tomorrow, new Date())
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
