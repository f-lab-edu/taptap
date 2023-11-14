import React, { createContext, useContext, useEffect, useState } from 'react'

import {
  addDays,
  startOfDay,
  differenceInMilliseconds,
  addHours,
} from 'date-fns'

const TodayContext = createContext(new Date())

const OFFSET = 4 // 하루의 시작은 4시. 추후 사용자 설정 가능
const customStartOfDay = (date: Date) => addHours(startOfDay(date), OFFSET)

export const TodayContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [today, setToday] = useState(customStartOfDay(new Date()))

  useEffect(() => {
    const tomorrow = customStartOfDay(addDays(today, 1))
    const delay = differenceInMilliseconds(tomorrow, today)
    const id = setTimeout(() => setToday(tomorrow), delay)
    return () => clearTimeout(id)
  }, [today])

  return <TodayContext.Provider value={today}>{children}</TodayContext.Provider>
}

const useToday = () => useContext(TodayContext)

export default useToday
