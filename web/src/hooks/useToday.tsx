import React, { createContext, useContext, useEffect, useState } from 'react'

import { addDays, getTime, startOfDay } from 'date-fns'

const TodayContext = createContext(new Date())

export const TodayContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const delay = getTime(startOfDay(addDays(today, 1))) - getTime(today)
    setTimeout(() => setToday(new Date()), delay)
  }, [today])

  return <TodayContext.Provider value={today}>{children}</TodayContext.Provider>
}

const useToday = () => useContext(TodayContext)

export default useToday
