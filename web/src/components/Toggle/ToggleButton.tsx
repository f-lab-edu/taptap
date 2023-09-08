import { ButtonHTMLAttributes } from 'react'
import { useToggleContext } from './ToggleContext'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

const ToggleButton = ({ children, ...rest }: Props) => {
  const { toggle } = useToggleContext()
  return (
    <button onClick={toggle} {...rest}>
      {children}
    </button>
  )
}

export default ToggleButton
