import React, { memo, startTransition } from 'react'

import { Select, Text } from '@chakra-ui/react'
import { startOfDay } from 'date-fns'

import { Controller, useFormContext, useWatch } from '@redwoodjs/forms'

import useRecords from 'src/hooks/useRecords'
import useTasks from 'src/hooks/useTasks'
import { formatDuration } from 'src/lib/formatters'

const TaskSelectField = () => {
  const {
    data: { tasks },
  } = useTasks({ date: new Date() })

  const { control } = useFormContext()
  const taskId = useWatch({ control, name: 'taskId' })
  const {
    data: {
      records: { duration },
    },
  } = useRecords({ date: startOfDay(new Date()).toISOString(), taskId })

  return (
    <div className="flex flex-col items-center gap-2">
      <Controller
        name="taskId"
        control={control}
        rules={{ required: true }}
        defaultValue={tasks[0]?.id}
        render={({ field }) => (
          <Select
            {...field}
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
      <Text fontSize="sm" color="gray.500">
        {formatDuration(duration)}
      </Text>
    </div>
  )
}

export default memo(TaskSelectField)
