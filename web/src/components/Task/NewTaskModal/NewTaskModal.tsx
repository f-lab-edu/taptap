import { useEffect } from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react'
import type { CreateTaskInput } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { Toaster } from '@redwoodjs/web/toast'
import { toast } from '@redwoodjs/web/toast'

import TaskFormCell from 'src/components/Task/TaskFormCell'

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

const NewTask = ({ isOpen, onClose }: Props) => {
  const [createTask, { loading, error }] = useMutation(CREATE_TASK_MUTATION, {
    onCompleted: () => {
      console.log('complete in new task')
      toast.success('할 일이 저장되었습니다')
      onClose()
    },
    onError: (error) => {
      console.log('error in new task')
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateTaskInput) =>
    createTask({ variables: { input } })

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
