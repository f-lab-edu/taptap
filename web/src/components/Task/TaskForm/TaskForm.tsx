import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  VStack,
} from '@chakra-ui/react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

import type { EditTaskById, UpdateTaskInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

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
  const onSubmit = (data: FormTask) => {
    onSave(data, task?.id)
  }

  return (
    <VStack as="form" align="stretch" spacing="4" w="full">
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input placeholder="제목을 입력해주세요" />
      </FormControl>
      <RadioGroup className="flex flex-col gap-2">
        <RadioGroup.Label>카테고리</RadioGroup.Label>
        <HStack>
          {categories.map((category) => (
            <RadioGroup.Option key={category.id} value={category.id}>
              {({ checked }) => (
                <Tag
                  variant={checked ? 'solid' : 'outline'}
                  colorScheme="teal"
                  borderRadius="full"
                  cursor="pointer"
                  px="3"
                  py="1"
                >
                  {category.title}
                </Tag>
              )}
            </RadioGroup.Option>
          ))}
        </HStack>
      </RadioGroup>
      <RadioGroup>
        <RadioGroup.Label>색상</RadioGroup.Label>
        <div className="m-0 flex flex-wrap justify-between gap-x-[2%] gap-y-2">
          {colorchips.map((c) => (
            <RadioGroup.Option
              key={c.value}
              value={c.value}
              className="relative h-0 flex-[8%] pb-[8%]"
            >
              {({ checked }) => (
                <Box
                  bg={c.value}
                  className="absolute flex h-full w-full overflow-hidden rounded-lg"
                >
                  {checked && (
                    <div className="flex h-full w-full items-center justify-center bg-black/50">
                      <Icon
                        as={CheckIcon}
                        color="white"
                        w="7"
                        strokeWidth="2.5"
                      />
                    </div>
                  )}
                </Box>
              )}
            </RadioGroup.Option>
          ))}
        </div>
        {/* <Tabs variant="line" colorScheme="gray" size="sm">
          <TabList>
            <Tab px="3">theme1</Tab>
          </TabList>
          <TabPanels>
            <TabPanel
              px="0"
              className="m-0 flex flex-wrap justify-between gap-x-[2%] gap-y-2 p-0"
            >
              {colorchips.map((c) => (
                <RadioGroup.Option
                  key={c.value}
                  value={c.value}
                  className="relative h-0 flex-[8%] pb-[8%]"
                >
                  <Box
                    bg={c.value}
                    className="absolute h-full w-full rounded-lg"
                  />
                </RadioGroup.Option>
              ))}
            </TabPanel>
            <TabPanel>
              <p>two</p>
            </TabPanel>
          </TabPanels>
        </Tabs> */}
      </RadioGroup>

      <FormControl>
        <FormLabel>반복 설정</FormLabel>
      </FormControl>
    </VStack>
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
