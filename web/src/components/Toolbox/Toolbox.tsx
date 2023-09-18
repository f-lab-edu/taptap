import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

interface Props {
  items: {
    label: string
    onClick: () => void
  }[]
}

const Toolbox = ({ items }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        variant="unstyled"
        icon={
          <EllipsisVerticalIcon
            className="m-2 h-5 w-5 text-slate-500"
            aria-hidden="true"
          />
        }
      />
      <MenuList>
        {items.map((item) => (
          <MenuItem key={item.label} as="button" onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default React.memo(Toolbox)
