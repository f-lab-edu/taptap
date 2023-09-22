import { useCallback } from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react'
import type {
  EditTaskById,
  FindCategoriesForTask,
  UpdateTaskInput,
} from 'types/graphql'

import { useForm, SubmitHandler, Controller } from '@redwoodjs/forms'

import CategoryRadio from './CategoryRadio'
import ColorRadio from './ColorRadio'

type FormTask = NonNullable<EditTaskById['task']>

export interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void | Promise<any>
  onCancel: () => void
  categories: FindCategoriesForTask['categories']
}

const TaskForm = ({ task, onSave, onCancel, categories }: TaskFormProps) => {
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<FormTask>({
    defaultValues: {
      title: task?.title || '',
      categoryId: task?.categoryId || categories[0].id,
      color: task?.color || COLOR_PALETTE[0].value,
    },
  })

  const [color, categoryId] = watch(['color', 'categoryId'])

  const onSubmit: SubmitHandler<FormTask> = useCallback(
    async (data) => {
      await onSave(data, task?.id)
    },
    [onSave, task]
  )

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          type="text"
          placeholder="제목을 입력해주세요"
          {...register('title', { required: true })}
        />
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel as="legend">카테고리</FormLabel>
        <HStack>
          {categories.map(({ id, title }) => (
            <Controller
              key={id}
              name="categoryId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <CategoryRadio
                  {...field}
                  value={id}
                  label={title}
                  active={categoryId === id}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              )}
            />
          ))}
        </HStack>
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel>색상</FormLabel>
        <Flex flexWrap="wrap" justify="space-between" rowGap="2" columnGap="2%">
          {COLOR_PALETTE.map(({ value }) => (
            <ColorRadio
              {...register('color')}
              key={value}
              value={value}
              active={value === color}
            />
          ))}
        </Flex>
      </FormControl>

      <footer className="flex flex-row justify-end gap-4">
        <Button onClick={onCancel}>취소</Button>
        <Button type="submit" isLoading={isSubmitting} colorScheme="teal">
          저장
        </Button>
      </footer>
    </form>
  )
}

export default React.memo(TaskForm)

const COLOR_PALETTE = [
  { value: '#073b4c' },
  { value: '#005f73' },
  { value: '#0a9396' },
  { value: '#94d2bd' },
  { value: '#e9d8a6' },
  { value: '#ee9b00' },
  { value: '#ca6702' },
  { value: '#bb3e03' },
  { value: '#ae2012' },
  { value: '#9b2226' },
  { value: '#344e41' },
  { value: '#3a5a40' },
  { value: '#588157' },
  { value: '#a3b18a' },
  { value: '#dad7cd' },
  { value: '#cac5b8' },
  { value: '#98948a' },
  { value: '#65635c' },
  { value: '#33312e' },
  { value: '#000000' },
]
