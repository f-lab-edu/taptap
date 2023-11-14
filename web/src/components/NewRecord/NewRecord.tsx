import React, { createContext, useCallback, useContext } from 'react'

import { differenceInMilliseconds, getTime } from 'date-fns'
import { tasks } from 'types/graphql'

import { FormProvider, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'
import { toast } from '@redwoodjs/web/dist/toast'

import { GET_RECORDS } from 'src/hooks/useRecords'
import useTasks from 'src/hooks/useTasks'
import useToday from 'src/hooks/useToday'

import TaskSelectField, { GET_TASK } from './components/TaskSelectField'
import Timer from './components/Timer'
import TimerButton from './components/TimerButton'

const CREATE_RECORD = gql`
  mutation createRecord($input: CreateRecordInput!) {
    createRecord(input: $input) {
      id
      start
      end
      taskId
      task {
        id
        title
        color
      }
    }
  }
`

interface NewRecordForm {
  taskId
  start
  end
}

interface Props {
  children:
    | ((props: { isRecording: boolean }) => React.ReactNode)
    | React.ReactNode
}

// TODO: 10시간 초과 기록 제한
// TODO: 할 일 조회시 로딩, 실패 ui
// TODO: 새 기록 생성시, 실패시

interface Context {
  tasks: tasks['tasks']
}

const NewRecordContext = createContext<null | Context>(null)

const NewRecord = ({ children }: Props) => {
  const today = useToday()
  const {
    data: { tasks },
  } = useTasks({ date: today })

  const [createRecord] = useMutation(CREATE_RECORD, {
    onCompleted: () => toast.success('기록이 저장되었습니다'),
    onError: (error) => console.log('error: ', error),
    update: (cache, { data: { createRecord: newRecord } }) => {
      cache.updateQuery(
        {
          query: GET_RECORDS,
          variables: { date: today.toISOString() },
        },
        (data) => ({ records: data.records.concat(newRecord) })
      )
      cache.updateQuery(
        {
          query: GET_TASK,
          variables: {
            id: newRecord.taskId,
            date: today.toISOString(),
          },
        },
        (data) => ({
          task: { ...data.task, records: data.task.records.concat(newRecord) },
        })
      )
    },
  })

  const method = useForm<NewRecordForm>({
    defaultValues: { taskId: tasks[0]?.id },
  })
  const { handleSubmit, reset, watch } = method
  const { start } = watch()

  const isUnderMinTime = useCallback(({ start, end }: NewRecordForm) => {
    const MIN_TIME = 1000 * 60 // 1 minute
    const durationTime = differenceInMilliseconds(end, start)
    return durationTime < MIN_TIME
  }, [])

  const onSubmit: SubmitHandler<NewRecordForm> = useCallback(
    async (input) => {
      reset({ taskId: input.taskId })
      if (isUnderMinTime(input)) {
        toast('1분 미만의 기록은 저장되지 않습니다.')
        return
      }

      await createRecord({
        variables: { input },
        optimisticResponse: {
          createRecord: {
            __typename: 'Record',
            id: getTime(new Date()),
            ...input,
          },
        },
      })
    },
    [createRecord, reset, isUnderMinTime]
  )

  return (
    <NewRecordContext.Provider value={{ tasks }}>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {typeof children === 'function'
            ? children({ isRecording: start })
            : children}
        </form>
      </FormProvider>
    </NewRecordContext.Provider>
  )
}

export const useNewRecordContext = () => {
  const context = useContext(NewRecordContext)
  if (!context) {
    throw new Error('cannot be rendered outside of the NewRecordContext')
  }

  return context
}

NewRecord.TaskSelectField = TaskSelectField
NewRecord.TimerButton = TimerButton
NewRecord.Timer = Timer

export default NewRecord
