import React, { useCallback } from 'react'

import { TypedDocumentNode } from '@apollo/client'
import { Button, Select } from '@chakra-ui/react'
import { Task } from 'types/graphql'

import { Controller, SubmitHandler, useForm } from '@redwoodjs/forms'
import {
  useMutation,
  useSuspenseQuery,
} from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

import useRecords from 'src/hooks/useRecords'

import Timer from './components/Timer'

const GET_TASKS: TypedDocumentNode<Data, Variables> = gql`
  query FindTasks($date: DateTime) {
    tasks(date: $date) {
      id
      title
      color
      category {
        title
      }
    }
  }
`

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

interface Variables {
  date: Date
}

interface Data {
  tasks: Task[]
}

interface NewRecordForm {
  taskId
  start
  end
}

const NewRecord = () => {
  const {
    data: { tasks },
  } = useSuspenseQuery(GET_TASKS, {
    variables: { date: new Date() },
  })

  const [createRecord] = useMutation(CREATE_RECORD, {
    onCompleted: () => console.log('성공'),
    onError: (error) => console.log('error: ', error),
  })

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<NewRecordForm>()

  const { start, taskId } = watch()

  const onSubmit: SubmitHandler<NewRecordForm> = useCallback(
    async (input) => {
      await createRecord({ variables: { input } })
    },
    [createRecord]
  )

  const {
    data: {
      records: {
        duration: { hours, minutes, seconds },
      },
    },
  } = useRecords({ date: new Date().toISOString(), taskId })
  console.log('taskId', taskId)

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="taskId"
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              onChange={(e) => field.onChange(parseInt(e.target.value))}
            >
              {tasks.map(({ id, title }) => (
                <option key={id} value={id}>
                  {title}
                </option>
              ))}
            </Select>
          )}
        />
        <p className="text-sm">{`${hours}:${minutes}:${seconds}`}</p>
        <Controller
          control={control}
          name="start"
          render={({ field: { onChange } }) => (
            <Button type="button" onClick={() => onChange(new Date())}>
              start
            </Button>
          )}
        />

        {start && (
          <>
            <Timer start={start} />
            <Controller
              control={control}
              name="end"
              render={({ field: { onChange } }) => (
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  onClick={() => onChange(new Date())}
                >
                  그만할래요
                </Button>
              )}
            />
          </>
        )}
      </form>
    </div>
  )
}

export default NewRecord
