import tw from 'twin.macro'
import styled from 'styled-components'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

interface Props {
  onEdit: () => void
  onDelete: () => void
}

export const Toolbox = ({ onDelete, onEdit }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        variant="ghost"
        // isRound
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
        <MenuItem as="button" onClick={onEdit}>
          수정
        </MenuItem>
        <MenuItem as="button" onClick={onDelete}>
          삭제
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
