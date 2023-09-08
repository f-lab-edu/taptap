import { useToggleContext } from './ToggleContext'

interface ToggleListProps {
  children: React.ReactNode
}

const ToggleList = ({ children }: ToggleListProps) => {
  const { on } = useToggleContext()
  return on && <div>{children}</div>
}

export default ToggleList
