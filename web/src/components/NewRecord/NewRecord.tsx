import React, { useCallback } from 'react'

import { FormProvider, SubmitHandler, useForm } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

import { GET_RECORDS } from 'src/hooks/useRecords'

import TaskSelectField from './components/TaskSelectField'
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
  children: (props: { isRecording: boolean }) => React.ReactNode
}

const NewRecord = ({ children }: Props) => {
  const [createRecord] = useMutation(CREATE_RECORD, {
    onCompleted: () => console.log('성공'),
    onError: (error) => console.log('error: ', error),
    refetchQueries: [GET_RECORDS],
  })

  const method = useForm<NewRecordForm>()
  const { handleSubmit, reset, watch } = method
  const { start } = watch()

  const onSubmit: SubmitHandler<NewRecordForm> = useCallback(
    async (input) => {
      // TODO: 15초 미만의 기록은 저장 x
      reset({ taskId: input.taskId })
      await createRecord({ variables: { input } })
    },
    [createRecord, reset]
  )

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children({ isRecording: start })}
      </form>
    </FormProvider>
  )
}

NewRecord.TaskSelectField = TaskSelectField
NewRecord.TimerButton = TimerButton
NewRecord.Timer = Timer

export default NewRecord
