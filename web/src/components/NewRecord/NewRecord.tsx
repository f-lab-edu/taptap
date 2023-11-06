import React, { createContext, useCallback, useContext } from 'react'

import { getTime, startOfDay } from 'date-fns'
import { tasks } from 'types/graphql'

import { FormProvider, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

import { GET_RECORDS } from 'src/hooks/useRecords'
import useTasks from 'src/hooks/useTasks'

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
// TODO: 할 일 조회시 로딩, empty, 실패 ui
// TODO: 새 기록 생성시, 실패시

interface Context {
  tasks: tasks['tasks']
}

const NewRecordContext = createContext<null | Context>(null)

const NewRecord = ({ children }: Props) => {
  const {
    data: { tasks },
  } = useTasks()

  const [createRecord] = useMutation(CREATE_RECORD, {
    onCompleted: () => console.log('성공'),
    onError: (error) => console.log('error: ', error),
    update: (cache, { data: { createRecord: newRecord } }) => {
      // FIXME: variables.date -> <today>
      cache.updateQuery(
        {
          query: GET_RECORDS,
          variables: { date: startOfDay(new Date()).toISOString() },
        },
        (data) => ({ records: data.records.concat(newRecord) })
      )
      cache.updateQuery(
        {
          query: GET_TASK,
          variables: {
            id: newRecord.taskId,
            date: startOfDay(new Date()).toISOString(),
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

  const onSubmit: SubmitHandler<NewRecordForm> = useCallback(
    async (input) => {
      // TODO: 15초 미만의 기록은 저장 x
      reset({ taskId: input.taskId })
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
    [createRecord, reset]
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
