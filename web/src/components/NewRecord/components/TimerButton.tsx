import React, { memo, useCallback } from 'react'

import { Button, Icon } from '@chakra-ui/react'
import { PlayIcon } from '@heroicons/react/20/solid'

import { Controller, useFormContext } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'

const TimerButton = () => {
  const {
    control,
    formState: { isSubmitting },
    watch,
    setValue,
  } = useFormContext()
  const { start, taskId } = watch()
  const startTimer = useCallback(() => {
    if (!taskId) {
      toast('할 일을 선택해주세요')
      return
    }

    setValue('start', new Date())
  }, [taskId, setValue])

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
      render={() => (
        <Button
          type="button"
          minW="200px"
          borderRadius="full"
          fontWeight="bold"
          colorScheme="teal"
          gap="2"
          onClick={startTimer}
        >
          START
          <Icon as={PlayIcon} fontSize="sm" />
        </Button>
      )}
    />
  )
}

export default memo(TimerButton)
