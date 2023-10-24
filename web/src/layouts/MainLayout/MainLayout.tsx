import { HStack } from '@chakra-ui/react'

import Sidebar from 'src/components/Sidebar/Sidebar'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <HStack className="bg-neutral-100" w="full" h="100vh" spacing="0.5">
      <Sidebar />
      <div className="h-full flex-1">{children}</div>
    </HStack>
  )
}

export default MainLayout
