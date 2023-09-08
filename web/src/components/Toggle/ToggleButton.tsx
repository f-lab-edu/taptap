import { useToggleContext } from './ToggleContext'

interface Props {
  children?: React.ReactNode
}

const ToggleButton = ({ children }: Props) => {
  const { toggle } = useToggleContext()
  return <button onClick={toggle}>{children}</button>
}

export default ToggleButton
