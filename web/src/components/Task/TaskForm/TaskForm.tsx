import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Tag,
  VStack,
  useRadioGroup,
} from '@chakra-ui/react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import type { EditTaskById, UpdateTaskInput } from 'types/graphql'

import {
  useForm,
  type RWGqlError,
  Controller,
  Form,
  useRegister,
  Label,
  InputField,
  TextField,
  RadioField,
} from '@redwoodjs/forms'

import ColorRadio from './ColorRadio'

type FormTask = NonNullable<EditTaskById['task']>

interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void
  error: RWGqlError
  loading: boolean
}

const categories = [
  { id: '1', title: '개인' },
  { id: '2', title: '업무' },
]

const TaskForm = ({ task, onSave, error, loading }: TaskFormProps) => {
  const form = useForm()
  const selectedColor = form.watch('color')
  const category = form.watch('category')
  const onSubmit = (data: FormTask) => {
    // onSave(data, task?.id)
    console.log('data: ', data)
  }

  return (
    <Form
      className="flex w-full flex-col"
      formMethods={form}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Label name="title">제목</Label>
      <TextField
        name="title"
        validation={{ required: true }}
        placeholder="제목을 입력해주세요"
        className="border-natural-50 rounded-md border-[1px] border-solid px-3 py-1.5"
      />
      <Label name="category">카테고리</Label>
      <HStack>
        {categories.map(({ id, title }) => (
          <label key={id}>
            <input
              hidden
              type="radio"
              value={id}
              {...form.register('category')}
            />
            <Tag
              variant={category === id ? 'solid' : 'outline'}
              colorScheme="teal"
              borderRadius="full"
              cursor="pointer"
              px="3"
              py="1"
            >
              {title}
            </Tag>
          </label>
        ))}
      </HStack>
      <Flex flexWrap="wrap" justify="space-between" rowGap="2" columnGap="2%">
        {colorchips.map(({ value }) => (
          <ColorRadio
            {...form.register('color')}
            key={value}
            value={value}
            active={value === selectedColor}
          />
        ))}
      </Flex>
    </Form>
  )
}

export default TaskForm

const colorchips = [
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
