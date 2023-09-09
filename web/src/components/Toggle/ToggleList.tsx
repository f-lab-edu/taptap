import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { useToggleContext } from './ToggleContext'

interface ToggleListProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ToggleList = ({ children, ...rest }: ToggleListProps) => {
  const { on } = useToggleContext()
  return on && <div {...rest}>{children}</div>
}

export default ToggleList
