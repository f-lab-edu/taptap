interface Props {
  onEdit: () => void
  onDelete: () => void
}

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import tw from 'twin.macro'
import styled from 'styled-components'

export const Toolbox = ({ onDelete, onEdit }: Props) => {
  const options = [
    { label: '수정', onClick: onEdit, icon: <PencilIcon aria-hidden="true" /> },
    {
      label: '삭제',
      onClick: onDelete,
      icon: <TrashIcon aria-hidden="true" />,
    },
  ]

  return (
    <Menu as="div">
      <Menu.Button className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-300 bg-opacity-0 hover:bg-opacity-30 focus:outline-none">
        <span className="invisible h-0 w-0 overflow-hidden">Options</span>
        <EllipsisVerticalIcon
          className="ml-2 mr-1 h-5 w-5 text-slate-500"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="p-1">
            {options.map(({ label, onClick }) => (
              <Menu.Item>
                {({ active }) => (
                  <Option active={active} onClick={onClick}>
                    {label}
                  </Option>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

const Option = styled.button<{ active: boolean }>(({ active }) => [
  [
    tw`flex w-full items-center rounded-md px-2 py-2 text-sm block`,
    active && tw`bg-slate-300/30 font-semibold`,
  ],
])
