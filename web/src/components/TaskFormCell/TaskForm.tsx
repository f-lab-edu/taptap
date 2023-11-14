import { useCallback } from 'react'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  VStack,
  Text,
} from '@chakra-ui/react'
import { PlusSmallIcon } from '@heroicons/react/20/solid'

import {
  useForm,
  SubmitHandler,
  FormProvider,
  Controller,
} from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import useToday from 'src/hooks/useToday'

import CategoryRadio from './components/CategoryRadio'
import ColorRadio from './components/ColorRadio'
import DateField from './components/DateField'
import RepeatField from './components/RepeatField'
import TimeField from './components/TimeField/TimeField'
import { TaskFormProps, TaskFormData } from './TaskForm.types'
import { OPTIONS, defaultValues } from './TaskForm.utils'

const TaskForm = ({ task, onSave, onCancel, categories }: TaskFormProps) => {
  const { today } = useToday()
  const formMethod = useForm<TaskFormData>({
    defaultValues: {
      ...defaultValues,
      startDate: today,
      ...(task
        ? { title: task.title, category: task.categoryId, color: task.color }
        : { category: categories[0]?.id }),
    },
  })

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = formMethod

  const { color, category } = watch()

  const onSubmit: SubmitHandler<TaskFormData> = useCallback(
    async (data) => {
      await onSave(data, task?.id)
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
            <FormLabel>
              제목
              {errors.title && (
                <Text fontSize="xs" color="red.400">
                  {errors.title.message}
                </Text>
              )}
            </FormLabel>
            <Input
              type="text"
              {...register('title', { required: '할 일을 적어주세요.' })}
            />
          </FormControl>

          <FormControl as="fieldset">
            <FormLabel as="legend">
              카테고리
              {errors.category && (
                <Text fontSize="xs" color="red.400">
                  {errors.category.message}
                </Text>
              )}
            </FormLabel>
            <input
              {...register('category', {
                required: '카테고리를 선택해주세요.',
              })}
              readOnly
              hidden
              aria-hidden
            />
            <HStack>
              {categories.map(({ id, title }) => (
                <Controller
                  key={id}
                  name="category"
                  control={control}
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
              <Link to={routes.categories()}>
                <IconButton
                  as="span"
                  aria-label="카테고리 추가"
                  isRound
                  size="xs"
                  variant="outline"
                  colorScheme="blue"
                  icon={<PlusSmallIcon />}
                />
              </Link>
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
              {OPTIONS.color.map((value) => (
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
