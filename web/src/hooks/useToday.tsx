import React, { createContext, useContext, useEffect, useState } from 'react'

import {
  addDays,
  startOfDay,
  differenceInMilliseconds,
  addHours,
} from 'date-fns'

const TodayContext = createContext(new Date())

const OFFSET = 4 // 하루의 시작은 4시. 추후 사용자 설정 가능
export const TodayContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const tomorrow = addHours(startOfDay(addDays(today, 1)), OFFSET)
    const delay = differenceInMilliseconds(tomorrow, today)
    const id = setTimeout(() => setToday(tomorrow), delay)
    return () => clearTimeout(id)
  }, [today])

  return <TodayContext.Provider value={today}>{children}</TodayContext.Provider>
}

const useToday = () => useContext(TodayContext)

export default useToday
