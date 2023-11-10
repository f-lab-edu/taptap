import React, { memo, useEffect, useMemo, useTransition } from 'react'

import { Select, Text } from '@chakra-ui/react'
import { startOfDay } from 'date-fns'

import { Controller, useFormContext, useWatch } from '@redwoodjs/forms'
import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

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
  const { control } = useFormContext()
  const taskId = useWatch({ control, name: 'taskId' })
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
    data: { task },
  } = useSuspenseQuery(GET_TASK, {
    variables: {
      id: taskId,
      date: startOfDay(new Date()).toISOString(),
    },
  })

  const { hours, minutes, seconds } = useMemo(
    () => formatDuration(task.duration),
    [task]
  )

  // useEffect(() => {
  //   console.log('[today] task: ', task)
  //   console.log('->', task.duration)
  // }, [task])

  // const {
  //   data: { task: pastTask },
  // } = useSuspenseQuery(GET_TASK, {
  //   variables: {
  //     id: taskId,
  //     date: startOfDay(new Date('2023-10-28')).toISOString(),
  //   },
  // })
  // useEffect(() => {
  //   console.log('[2023-10-28] task: ', pastTask)
  //   console.log('->', pastTask.duration)
  // }, [pastTask])

  return (
    <Text fontSize="sm" color="gray.500">
      {`${hours}:${minutes}:${seconds}`}
    </Text>
  )
}

export default memo(TaskSelectField)
