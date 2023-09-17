import React, { createContext, useContext, useMemo } from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  HStack,
  Box,
  IconButton,
  useBoolean,
  Image,
  Heading,
  Text,
} from '@chakra-ui/react'
import { styled } from 'styled-components'
import tw from 'twin.macro'

import Navigation from '../Navigation/Navigation'
import { Link, routes } from '@redwoodjs/router'

interface ControllerProps {
  $isOpen: boolean
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
  const value = useMemo(() => ({ isOpen, toggleSidebar: toggle }), [isOpen])

  return (
    <SidebarContext.Provider value={value}>
      <Container $isOpen={isOpen}>
        <Controller
          icon={<ControllerIcon $isOpen={isOpen} />}
          aria-label={isOpen ? '사이드바 열기' : '사이드바 닫기'}
          top="9"
          pos="absolute"
          right="0"
          size="xs"
          isRound
          bg="white"
          shadow="md"
          _hover={{}}
          _active={{}}
          onClick={toggle}
          $isOpen={isOpen}
        />
        <header>
          <Link
            to={routes.home()}
            className="block h-9 w-full bg-[url('images/logo.svg')] bg-contain bg-no-repeat"
            aria-label="logo"
          />
        </header>
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
        </Box>
      </Container>
    </SidebarContext.Provider>
  )
}

export default Sidebar

const Controller = styled(IconButton)<ControllerProps>(({ $isOpen = true }) => [
  $isOpen ? tw`translate-x-[50%] duration-1000` : tw`translate-x-[150%]`,
])

const ControllerIcon = styled(ChevronRightIcon)<ControllerProps>(
  ({ $isOpen }) => [tw`m-[6px] stroke-2`, $isOpen && tw`scale-x-[-1]`]
)

const Container = styled.div<ControllerProps>`
  ${tw`flex flex-col gap-8 py-8 h-screen bg-white drop-shadow-sm transition-all duration-500`}
  ${({ $isOpen }) => ($isOpen ? tw`w-1/4 pl-5 pr-6` : tw`w-[70px] px-4`)}
`
