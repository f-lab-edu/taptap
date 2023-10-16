import React from 'react'

import { Box, Center, Icon } from '@chakra-ui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
  active: boolean
}

const ColorRadio = React.forwardRef<HTMLInputElement, Props>(
  ({ active, ...props }, ref) => (
    <label className="relative block h-0 flex-[8%] pb-[8%]">
      <input {...props} ref={ref} type="radio" hidden />
      <Box
        pos="absolute"
        w="full"
        h="full"
        bg={props.value}
        rounded="lg"
        overflow="hidden"
        cursor="pointer"
        _focus={{ ring: '2' }}
        _focusVisible={{ boxShadow: 'outline' }}
      >
        {active && (
          <Center w="full" h="full" bg="blackAlpha.500" aria-hidden>
            <Icon as={CheckIcon} color="white" w="7" strokeWidth="2.5" />
          </Center>
        )}
      </Box>
    </label>
  )
)

export default React.memo(ColorRadio)
