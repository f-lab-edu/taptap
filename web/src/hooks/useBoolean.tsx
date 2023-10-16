import { useCallback, useState } from 'react'

const useBoolean = (initial = false) => {
  const [on, setOn] = useState(initial)
  const turnOn = useCallback(() => setOn(true), [])
  const turnOff = useCallback(() => setOn(false), [])
  const toggle = useCallback(() => setOn((prev) => !prev), [])

  return { on, turnOn, turnOff, toggle }
}

export default useBoolean
