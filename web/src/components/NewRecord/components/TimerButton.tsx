import React, { memo } from 'react'

import { Button, Icon } from '@chakra-ui/react'
import { PlayIcon } from '@heroicons/react/20/solid'

import { Controller, useFormContext, useWatch } from '@redwoodjs/forms'

const TimerButton = () => {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext()
  const start = useWatch({ control, name: 'start' })

  return start ? (
    <Controller
      key="end"
      name="end"
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Button
          type="submit"
          variant="outline"
          size="sm"
          isLoading={isSubmitting}
          onClick={() => onChange(new Date())}
        >
          그만할래요
        </Button>
      )}
    />
  ) : (
    <Controller
      key="start"
      name="start"
      control={control}
      rules={{ required: true }}
      render={({ field: { onChange } }) => (
        <Button
          type="button"
          minW="200px"
          borderRadius="full"
          fontWeight="bold"
          colorScheme="teal"
          gap="2"
          onClick={() => onChange(new Date())}
        >
          START
          <Icon as={PlayIcon} fontSize="sm" />
        </Button>
      )}
    />
  )
}

export default memo(TimerButton)
