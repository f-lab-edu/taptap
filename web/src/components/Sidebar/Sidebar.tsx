import React, { createContext, useContext, useMemo } from 'react'

import { Avatar, HStack, Box, useBoolean, Text, Button } from '@chakra-ui/react'
import tw, { styled } from 'twin.macro'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import Navigation from '../Navigation/Navigation'

import Controller from './components/Controller'

interface ControllerProps {
  isOpen: boolean
}

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<null | SidebarContextType>(null)
export const useSidebarContext = () => {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('cannot be rendered outside of the useSidebarContext')
  }

  return context
}

const Sidebar = () => {
  const [isOpen, { toggle }] = useBoolean()
  const value = useMemo(
    () => ({ isOpen, toggleSidebar: toggle }),
    [isOpen, toggle]
  )

  const { logOut } = useAuth()

  return (
    <SidebarContext.Provider value={value}>
      <Container isOpen={isOpen}>
        <Controller />
        <Navigation />

        <Box as="aside" mt="auto">
          {/* 프로필 */}
          <HStack align="center" w="100%" justify={isOpen ? 'start' : 'center'}>
            <Avatar size="sm" />
            {isOpen && (
              <Text fontSize="sm" fontWeight="bold">
                username
              </Text>
            )}
            {/* <Heading as="h3" size="sm">
            username
          </Heading> */}
          </HStack>
          <Button onClick={logOut}>logOut</Button>
        </Box>
      </Container>
    </SidebarContext.Provider>
  )
}

export default React.memo(Sidebar)

const Container = styled.div<ControllerProps>`
  ${tw`flex flex-col gap-8 py-8 h-screen bg-white drop-shadow-sm transition-all duration-500 z-10`}
  ${({ isOpen }) => (isOpen ? tw`w-[220px] pl-5 pr-6` : tw`w-[70px] px-4`)}
`
