import React, { useState } from 'react'

const useBoolean = (initial = false) => {
  const [on, setOn] = useState(initial)
  const open = () => setOn(true)
  const close = () => setOn(false)
  const toggle = () => setOn((prev) => !prev)

  return { on, open, close, toggle }
}

export default useBoolean
