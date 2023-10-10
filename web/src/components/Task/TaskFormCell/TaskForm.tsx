import { useCallback } from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react'

import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from '@redwoodjs/forms'

import CategoryRadio from './components/CategoryRadio'
import ColorRadio from './components/ColorRadio'
import DateField from './components/DateField'
import RepeatField from './components/RepeatField'
import TimeField from './components/TimeField/TimeField'
import { timeFormat } from './components/TimeField/TimeField.utils'
import { TaskFormProps, TaskFormData } from './TaskForm.types'
import { COLOR_PALETTE, getDefaultTimes } from './TaskForm.utils'

const TaskForm = ({ task, onSave, onCancel, categories }: TaskFormProps) => {
  const formMethod = useForm<TaskFormData>({
    defaultValues: {
      title: task?.title,
      category: task?.categoryId || categories[0].id,
      color: task?.color || COLOR_PALETTE[0].value,
      startDate: new Date(),
      times: {
        allDay: true,
        data: [getDefaultTimes().map(timeFormat) as [string, string]],
      },
      repeat: {
        repeat: '안함',
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

  const { color, category } = watch()

  const onSubmit: SubmitHandler<TaskFormData> = useCallback(
    async (data) => {
      await onSave(data, task?.id)
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
        <VStack as="main" gap="5" mb="5">
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
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CategoryRadio
                      {...field}
                      value={id}
                      label={title}
                      active={category === id}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  )}
                />
              ))}
            </HStack>
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel as="legend">색상</FormLabel>
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

          <DateField />
          <TimeField />
          <RepeatField />
        </VStack>

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
