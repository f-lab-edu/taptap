import { useEffect } from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react'
import { format, getDate, getDay, getMonth, getWeekOfMonth } from 'date-fns'
import type { UpdateRepeatInput } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'
import { toast } from '@redwoodjs/web/toast'

import TaskFormCell from 'src/components/Task/TaskFormCell'

import { RepeatOption, TaskFormData } from '../TaskFormCell/TaskForm.types'

const CREATE_TASK_MUTATION = gql`
  mutation CreateTaskMutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
    }
  }
`

interface Props {
  isOpen: boolean
  onClose: () => void
}

type RepeatData = {
  [key in RepeatOption]?: UpdateRepeatInput
}
const repeatData: RepeatData = {
  안함: undefined,
  매일: { type: 'Daily', interval: 1 },
  평일: {
    type: 'Weekly',
    interval: 1,
    daysOfWeek: [1, 2, 3, 4, 5],
  },
  주말: { type: 'Weekly', interval: 1, daysOfWeek: [0, 6] },
  매주: {
    type: 'Weekly',
    interval: 1,
    daysOfWeek: [getDay(new Date())],
  },
  매월: {
    type: 'Monthly',
    interval: 1,
    weekOfMonth: getWeekOfMonth(new Date()),
    daysOfWeek: [getDay(new Date())],
  },
  매년: {
    type: 'Yearly',
    interval: 1,
    months: [getMonth(new Date())],
    daysOfMonth: [getDate(new Date())],
  },
}

const NewTask = ({ isOpen, onClose }: Props) => {
  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('할 일이 저장되었습니다')
      onClose()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (data: TaskFormData) => {
    const input = {
      ...data,
      times: data.times.allDay ? undefined : data.times.data,
      startDate: format(data.startDate, 'yyyy-MM-dd'),
      category: {
        connect: {
          id: data.category,
        },
      },
      repeat: repeatData[data.repeat.repeat] && {
        create: {
          ...repeatData[data.repeat.repeat],
          endDate: data.repeat.endDate,
        },
      },
    }
    createTask({ variables: { input } })
  }

  useEffect(() => console.log('loading in new task', loading), [loading])
  useEffect(() => console.log('error in new task', error), [error])

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalContent pb="4">
          <ModalHeader>New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody display="block">
            <TaskFormCell onSave={onSave} onCancel={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewTask
