import { useCallback, useEffect } from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Select,
  Text,
} from '@chakra-ui/react'
import {
  format,
  eachMinuteOfInterval,
  endOfToday,
  startOfToday,
  getUnixTime,
} from 'date-fns'
import { DayPicker } from 'react-day-picker'
import type {
  EditTaskById,
  UpdateTaskInput,
  FindCategoriesForTask,
} from 'types/graphql'

import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from '@redwoodjs/forms'

import CategoryRadio from './CategoryRadio'
import ColorRadio from './ColorRadio'
import DateTimeField from './DateTimeField'

type FormTask = NonNullable<EditTaskById['task']>

type Form = {
  title: string
  categoryId: number
  color: string
  startDate: Date
  times: {
    start: string
    end: string
  }[]
  repeat: {
    repeat: string | null // map: type, interval
    endDate: Date | null
  }
}

export interface TaskFormProps {
  task?: EditTaskById['task']
  onSave: (data: UpdateTaskInput, id?: FormTask['id']) => void | Promise<any>
  onCancel: () => void
  categories: FindCategoriesForTask['categories']
}

const TaskForm = ({ task, onSave, onCancel, categories }: TaskFormProps) => {
  const formMethod = useForm<Form>({
    defaultValues: {
      title: task?.title || '',
      categoryId: task?.categoryId || categories[0].id,
      color: task?.color || COLOR_PALETTE[0].value,
      startDate: new Date(),
      times: [
        {
          start: '12:00', // 현재에 가까운 시간 (30분 간격?)
          end: '13:00', // 1시간
        },
      ],
      repeat: {
        endDate: null,
        repeat: null,
      },
    },
  })
  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = formMethod

  const { color, categoryId, startDate } = watch()

  const onSubmit: SubmitHandler<FormTask> = useCallback(
    async (data) => {
      // await onSave(data, task?.id)
      console.log(data)
    },
    [onSave, task]
  )

  return (
    <FormProvider {...formMethod}>
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input type="text" {...register('title', { required: true })} />
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
          <Flex
            flexWrap="wrap"
            justify="space-between"
            rowGap="2"
            columnGap="2%"
          >
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

        <DateTimeField />

        <FormControl as="fieldset">
          <FormLabel>반복설정</FormLabel>
          {/* {fields.map((field, index) => (
          <section key={field.id}>
            <Calendar {...register(`repeats.${index}.startDate` as const)} />
          </section>
        ))} */}

          {/* <Select placeholder="반복">
            {repeatOptions.map(({ id, label }) => (
              <option key={id}>{label}</option>
            ))}
          </Select>
          <Menu isLazy>
            <MenuButton w="full">
              <HStack justifyContent="space-between">
                <Text decoration="underline">반복 종료</Text>
                <Text>{endDate ? format(endDate, 'yyyy.MM.dd') : '안함'}</Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <Controller
                control={control}
                name="endDate"
                render={({ field: { onChange, value } }) => (
                  <DayPicker
                    mode="single"
                    onDayBlur={() => console.log('day picker blur')}
                    onSelect={onChange}
                    selected={value}
                  />
                )}
              />
            </MenuList>
          </Menu> */}

          {/* 반복종료일 */}
          {/* <Menu isLazy>
          <MenuButton>{format(new Date(startDate), 'yyyy.MM.dd')}</MenuButton>
          <MenuList>
            <Controller
              control={control}
              name="endDate"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <DayPicker
                  mode="single"
                  onDayBlur={() => console.log('day picker blur')}
                  onSelect={onChange}
                  selected={value}
                />
              )}
            />
          </MenuList>
        </Menu> */}
        </FormControl>

        <footer className="flex flex-row justify-end gap-4">
          <Button onClick={onCancel}>취소</Button>
          <Button type="submit" isLoading={isSubmitting} colorScheme="blue">
            저장
          </Button>
        </footer>
      </form>
    </FormProvider>
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

const timeOptions = eachMinuteOfInterval(
  {
    start: startOfToday(),
    end: endOfToday(),
  },
  { step: 10 }
)

const repeatOptions = [
  { id: 1, label: '안함' },
  { id: 2, label: '매일' },
  { id: 3, label: '평일' },
  { id: 4, label: '주말' },
  { id: 5, label: '매주' },
  { id: 6, label: '매월' },
  { id: 7, label: '매년' },
]
