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
    // icon?: HeroIconKey;
    label: string
    onClick: () => void
  }[]
}

export const Toolbox = ({ items }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        variant="ghost"
        _hover={{}}
        _active={{}}
        icon={
          <EllipsisVerticalIcon
            className="m-2 h-5 w-5 text-slate-500"
            aria-hidden="true"
          />
        }
      />
      <MenuList>
        {items.map((item) => (
          <MenuItem as="button" onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

// 라벨, 이벤트 핸들러

// 1. 귀찮음
// 2. 자유(잘못쓸수도있따)

// 100
// 1. 정확한 자유도 + 노귀찮

// 90
// 1. 정확한 자유도 + 귀찮 <- 잘못쓸일은ㅇ벗음
