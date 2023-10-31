import React, { createContext, useContext, useEffect, useState } from 'react'

import { isSameDay } from 'date-fns'

const RECALCULATE_INTERVAL = 1000 * 60 // 1 minute

const TodayContext = createContext(new Date())

export const TodayContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    const now = new Date()
    const id = setInterval(
      () => setToday((prev) => (isSameDay(prev, now) ? prev : now)),
      RECALCULATE_INTERVAL
    )
    return () => clearInterval(id)
  })

  return <TodayContext.Provider value={today}>{children}</TodayContext.Provider>
}

const useToday = () => useContext(TodayContext)

export default useToday
