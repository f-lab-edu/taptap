import React, { memo, useTransition } from 'react'

import { Select, Text } from '@chakra-ui/react'

import { Controller, useFormContext, useWatch } from '@redwoodjs/forms'

import useRecords from 'src/hooks/useRecords'
import { formatDuration } from 'src/lib/formatters'

import { useNewRecordContext } from '../NewRecord'

const TaskSelectField = () => {
  const { tasks } = useNewRecordContext()
  const { control } = useFormContext()
  const taskId = useWatch({ control, name: 'taskId' })
  // const {
  //   data: {
  //     records: { duration },
  //   },
  // } = useRecords({ date: today, taskId })

  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex flex-col items-center gap-2">
      <Controller
        name="taskId"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            {...field}
            isDisabled={isPending}
            onChange={(e) =>
              startTransition(() => field.onChange(parseInt(e.target.value)))
            }
          >
            {tasks.map(({ id, title }) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </Select>
        )}
      />
      <TaskDuration taskId={taskId} />
    </div>
  )
}

const TaskDuration = ({ taskId }: { taskId: number }) => {
  const {
    data: {
      records: { duration },
    },
  } = useRecords({ taskId })

  return (
    <Text fontSize="sm" color="gray.500">
      {formatDuration(duration)}
    </Text>
  )
}

export default memo(TaskSelectField)
