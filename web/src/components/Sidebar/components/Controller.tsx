import React, { memo, useMemo } from 'react'

import { IconButton } from '@chakra-ui/react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline'
import tw, { styled } from 'twin.macro'

import { useSidebarContext } from '../Sidebar'

interface Props {
  isOpen: boolean
}

const Controller = () => {
  const { isOpen, toggleSidebar } = useSidebarContext()
  const icon = useMemo(
    () =>
      isOpen ? (
        <ChevronRightIcon className="m-[6px] stroke-2" />
      ) : (
        <ChevronLeftIcon className="m-[6px] stroke-2" />
      ),
    [isOpen]
  )
  return (
    <Container isOpen={isOpen}>
      <IconButton
        icon={icon}
        aria-label={isOpen ? '사이드바 열기' : '사이드바 닫기'}
        size="xs"
        isRound
        bg="white"
        variant="unstyled"
        shadow="md"
        onClick={toggleSidebar}
      />
    </Container>
  )
}

export default memo(Controller)

const Container = styled.div<Props>`
  ${tw`absolute right-0 top-[9px] `}
  ${({ isOpen }) =>
    isOpen ? tw`translate-x-[50%] duration-1000` : tw`translate-x-[150%]`}
`
