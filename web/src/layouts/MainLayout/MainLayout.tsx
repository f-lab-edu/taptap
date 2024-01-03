import { HStack } from '@chakra-ui/react'

import { Toaster } from '@redwoodjs/web/dist/toast'

import Sidebar from 'src/components/Sidebar/Sidebar'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <HStack className="bg-neutral-100" w="full" h="100vh" spacing="0.5">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Sidebar />
      <div className="h-full flex-1">{children}</div>
    </HStack>
  )
}

export default MainLayout
