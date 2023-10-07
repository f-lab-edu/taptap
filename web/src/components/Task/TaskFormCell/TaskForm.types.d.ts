import { EditTaskById, FindCategoriesForTask } from 'types/graphql'

import { REPEAT_OPTIONS } from './TaskForm.utils'

export type Task = NonNullable<EditTaskById['task']>

export type RepeatOption = (typeof REPEAT_OPTIONS)[number]

export interface TaskFormData {
  title: string
  categoryId: number
  color: string
  startDate: Date
  times: [string, string][]
  repeat: {
    repeat: RepeatOption | null // map: type, interval
    endDate: Date | null
  }
}

export interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: FormData, id?: Task['id']) => void | Promise<Task>
  onCancel: () => void
  categories: FindCategoriesForTask['categories']
}
