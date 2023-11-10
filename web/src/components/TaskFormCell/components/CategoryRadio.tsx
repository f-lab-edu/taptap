import React, { forwardRef } from 'react'

import { Tag } from '@chakra-ui/react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number
  active: boolean
  label: string
}

const CategoryRadio = forwardRef<HTMLInputElement, Props>(
  ({ active, label, ...props }, ref) => (
    <label>
      <input {...props} ref={ref} type="radio" hidden />
      <Tag
        variant={active ? 'solid' : 'outline'}
        colorScheme="blue"
        borderRadius="full"
        cursor="pointer"
        px="3"
        py="1"
        display="inline-block"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        maxWidth="200px"
      >
        {label}
      </Tag>
    </label>
  )
)

export default React.memo(CategoryRadio)
