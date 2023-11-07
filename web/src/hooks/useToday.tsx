import React, { createContext, useContext, useEffect, useState } from 'react'

import { addDays, startOfDay, differenceInMilliseconds } from 'date-fns'

const TodayContext = createContext(new Date())

export const TodayContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const tomorrow = startOfDay(addDays(today, 1))
    const delay = differenceInMilliseconds(tomorrow, today)
    const id = setTimeout(() => setToday(tomorrow), delay)
    return () => clearTimeout(id)
  }, [today])

  return <TodayContext.Provider value={today}>{children}</TodayContext.Provider>
}

const useToday = () => useContext(TodayContext)

export default useToday
