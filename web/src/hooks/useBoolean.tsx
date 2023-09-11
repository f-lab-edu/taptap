import { useState } from 'react'

const useBoolean = (initial = false) => {
  const [on, setOn] = useState(initial)
  const turnOn = () => setOn(true)
  const turnOff = () => setOn(false)
  const toggle = () => setOn((prev) => !prev)

  return { on, turnOn, turnOff, toggle }
}

export default useBoolean
