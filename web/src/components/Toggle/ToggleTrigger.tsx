import { ButtonHTMLAttributes } from 'react'
import { useToggleContext } from './ToggleContext'

interface Props extends ButtonHTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const ToggleTrigger = ({ children, className, ...rest }: Props) => {
  const { toggle } = useToggleContext()
  return (
    <div onClick={toggle} className={`cursor-pointer ${className}`} {...rest}>
      {children}
    </div>
  )
}

export default ToggleTrigger
