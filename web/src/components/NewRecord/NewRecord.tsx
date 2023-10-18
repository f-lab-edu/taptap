import React, { useCallback } from 'react'

import { TypedDocumentNode } from '@apollo/client'
import { Select } from '@chakra-ui/react'
import { Task } from 'types/graphql'

import { useForm } from '@redwoodjs/forms'
import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

const GET_TASKS: TypedDocumentNode<Data, Variables> = gql`
  query FindTasks {
    tasks {
      id
      title
      color
      category {
        title
      }
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
}

const NewRecord = () => {
  const { data } = useSuspenseQuery(GET_TASKS, {
    variables: { date: new Date() },
  })

  const { register } = useForm<NewRecordForm>()

  return (
    <div>
      <form>
        <Select {...register('taskId')}>
          {data.tasks.map(({ id, title }) => (
            <option key={id} value={id}>
              {title}
            </option>
          ))}
        </Select>
      </form>
    </div>
  )
}

export default NewRecord
