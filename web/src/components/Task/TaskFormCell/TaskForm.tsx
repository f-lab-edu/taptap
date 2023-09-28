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
  FindCategoriesForTask,
  UpdateTaskInput,
} from 'types/graphql'

import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from '@redwoodjs/forms'

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
      // repeats: [{ startDate: new Date() }],
      startDate: new Date(),
      startTime: '',
      endTime: '',
    },
  })

  // const { fields, append, remove } = useFieldArray({
  //   name: 'repeats',
  //   control,
  // })

  const [color, categoryId, startDate, startTime, endTime] = watch([
    'color',
    'categoryId',
    'startDate',
    'startTime',
    'endTime',
  ])

  const onSubmit: SubmitHandler<FormTask> = useCallback(
    async (data) => {
      // await onSave(data, task?.id)
      console.log(data)
    },
    [onSave, task]
  )

  useEffect(() => console.log(startTime, endTime), [startTime, endTime])

  // TOOD: create time options - date fns에 있지 않을까
  const timeOptions = eachMinuteOfInterval(
    {
      start: startOfToday(),
      end: endOfToday(),
    },
    { step: 10 }
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

      <FormControl as="fieldset">
        <FormLabel>반복설정</FormLabel>
        {/* {fields.map((field, index) => (
          <section key={field.id}>
            <Calendar {...register(`repeats.${index}.startDate` as const)} />
          </section>
        ))} */}
        <Menu isLazy>
          <MenuButton>{format(new Date(startDate), 'yyyy.MM.dd')}</MenuButton>
          <MenuList>
            <Controller
              control={control}
              name="startDate"
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
        </Menu>
        {/* 객체처럼 key-value로 만들어야겟다 */}
        <HStack>
          <Select {...register('startTime')}>
            {timeOptions.map((time) => (
              <option key={getUnixTime(time)}>{format(time, 'HH:mm')}</option>
            ))}
          </Select>
          <Select {...register('endTime')}>
            <option>9:00</option>
            <option>10:00</option>
          </Select>
        </HStack>

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
