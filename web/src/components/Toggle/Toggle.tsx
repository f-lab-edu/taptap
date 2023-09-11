import { useState, useCallback, useMemo } from 'react'
import { ToggleContext } from './ToggleContext'
import ToggleButton from './ToggleTrigger'
import ToggleList from './TogglePanel'

interface Props {
  children: React.ReactNode
}

const Toggle = ({ children }: Props) => {
  const [on, setOn] = useState(false)
  const toggle = useCallback(() => setOn((prev) => !prev), [])
  const value = useMemo(() => ({ on, toggle }), [on])

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  )
}

Toggle.Trigger = ToggleButton
Toggle.Panel = ToggleList
export default Toggle
