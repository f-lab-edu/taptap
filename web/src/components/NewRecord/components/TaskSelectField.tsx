import React, { memo, useMemo, useTransition } from 'react'

import { Select, Text } from '@chakra-ui/react'

import { Controller, useFormContext, useWatch } from '@redwoodjs/forms'
import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

import useToday from 'src/hooks/useToday'
import { formatDuration } from 'src/lib/formatters'

import { useNewRecordContext } from '../NewRecord'

export const GET_TASK = gql`
  query task($id: Int!, $date: DateTime) {
    task(id: $id, date: $date) {
      id
      title
      color
      ...DurationField
    }
  }
`

const TaskSelectField = () => {
  const { tasks } = useNewRecordContext()
  const { control, watch } = useFormContext()
  const taskId = watch('taskId')
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
            placeholder="할 일 선택하기"
            onChange={(e) =>
              startTransition(() =>
                field.onChange(e.target.value && parseInt(e.target.value))
              )
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
      {taskId ? (
        <TaskDuration taskId={taskId} />
      ) : (
        <Text fontSize="sm" color="gray.500">
          00:00:00
        </Text>
      )}
    </div>
  )
}

const TaskDuration = ({ taskId }: { taskId: number }) => {
  const { today } = useToday()
  const {
    data: { task },
  } = useSuspenseQuery(GET_TASK, {
    variables: {
      id: taskId,
      date: today.toISOString(),
    },
  })

  const { hours, minutes, seconds } = useMemo(
    () => formatDuration(task.duration),
    [task]
  )

  return (
    <Text fontSize="sm" color="gray.500">
      {`${hours}:${minutes}:${seconds}`}
    </Text>
  )
}

export default memo(TaskSelectField)
