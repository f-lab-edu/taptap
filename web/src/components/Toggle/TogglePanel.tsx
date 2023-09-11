import { HTMLAttributes } from 'react'
import { useToggleContext } from './ToggleContext'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const TogglePanel = ({ children, ...rest }: Props) => {
  const { on } = useToggleContext()
  return on && <div {...rest}>{children}</div>
}

export default TogglePanel
