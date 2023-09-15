import { Box, Flex, HStack, useBoolean } from '@chakra-ui/react'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

import Sidebar from 'src/components/Sidebar/Sidebar'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { currentUser, logOut } = useAuth()

  return (
    <HStack className="bg-neutral-100" w="full" h="100vh" spacing="0.5">
      <Sidebar />
      <main className="h-full flex-1">
        <header>title</header>
        {children}
      </main>
    </HStack>
  )
}

export default MainLayout
