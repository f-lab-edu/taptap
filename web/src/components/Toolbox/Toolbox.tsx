import React, { useState } from 'react'
import useBoolean from 'src/hooks/useBoolean'

import { RiMore2Fill } from 'react-icons/ri'

interface Props {
  onEdit: () => void
  onDelete: () => void
}

export const Toolbox = ({ onEdit, onDelete }: Props) => {
  const { on, toggle } = useBoolean()

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="flex	h-12 w-12 items-center justify-center"
      >
        <RiMore2Fill />
      </button>
      {on && (
        <div className="absolute">
          <button onClick={onEdit}>수정</button>
          <button onClick={onDelete}>삭제</button>
        </div>
      )}
    </div>
  )
}

// TODO: 수정, 삭제 버튼 래퍼는 absolute 위치
// 메뉴는 trasition 필요
