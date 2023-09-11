import React from 'react'

import { RiMore2Fill } from 'react-icons/ri'
import IconButton from '../Buttons/IconButton'
import Toggle from '../Toggle/Toggle'

interface Props {
  onEdit: () => void
  onDelete: () => void
}

export const Toolbox = ({ onEdit, onDelete }: Props) => {
  return (
    <Toggle>
      <div className="relative">
        <Toggle.Trigger>
          <RiMore2Fill />
        </Toggle.Trigger>
        <Toggle.Panel className="absolute">
          <button onClick={onEdit}>수정</button>
          <button onClick={onDelete}>삭제</button>
        </Toggle.Panel>
      </div>
    </Toggle>
  )
}

// TODO: 수정, 삭제 버튼 styling
// 메뉴는 trasition 필요
