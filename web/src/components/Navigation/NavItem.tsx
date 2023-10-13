import React, { memo, useMemo } from 'react'

import { Icon, Text, HStack } from '@chakra-ui/react'

import { NavLink, useMatch } from '@redwoodjs/router'

import { useSidebarContext } from '../Sidebar'

export interface NavItemProps {
  title: string
  to: string
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >
}

const NavItem = ({ title, to, icon }: NavItemProps) => {
  const { isOpen } = useSidebarContext()
  const { match } = useMatch(to)
  const color = useMemo(() => (match ? '#0a0a0a' : '#a3a3a3'), [match])

  return (
    <NavLink
      to={to}
      className="group flex h-9 items-center rounded-lg px-3 transition duration-150 hover:bg-neutral-200/30"
      activeClassName="bg-neutral-200/70"
    >
      <HStack
        fontWeight="bold"
        color={color}
        fontSize="sm"
        margin={isOpen ? 'none' : 'auto'}
      >
        <Icon as={icon} fontSize="lg" strokeWidth="2" />
        {isOpen && <Text>{title}</Text>}
      </HStack>
    </NavLink>
  )
}

export default memo(NavItem)
