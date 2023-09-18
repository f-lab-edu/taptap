import React, { memo, useMemo } from 'react'

import { Icon, Text, HStack } from '@chakra-ui/react'
import { styled } from 'styled-components'
import tw from 'twin.macro'

import { Link, useMatch } from '@redwoodjs/router'

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
    <Container to={to} $active={match} $isOpen={isOpen}>
      <HStack fontWeight="bold" color={color} fontSize="sm">
        <Icon as={icon} fontSize="lg" strokeWidth="2" />
        {isOpen && <Text>{title}</Text>}
      </HStack>
    </Container>
  )
}

export default memo(NavItem)

const Container = styled(Link)<{ $active?: boolean; $isOpen: boolean }>`
  ${tw`
    flex items-center h-9 px-3 rounded-lg transition duration-150
  `}

  ${({ $active }) =>
    $active ? tw`bg-neutral-200/70` : tw`hover:bg-neutral-200/30`}
  ${({ $isOpen }) => ($isOpen ? tw`justify-start` : tw`flex justify-center`)}
`
