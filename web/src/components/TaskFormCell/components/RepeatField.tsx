import React, { memo } from 'react'

import {
  FormControl,
  FormLabel,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Select,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { Controller, useFormContext, useWatch } from '@redwoodjs/forms'

import { OPTIONS } from '../TaskForm.utils'

const RepeatField = () => {
  const { control, register } = useFormContext()
  const value = useWatch({ name: 'repeat' })
  return (
    <FormControl as="fieldset" display="flex" flexDirection="column" gap="2">
      <FormLabel as="legend">반복설정</FormLabel>
      <section>
        <Select {...register('repeat.repeat')}>
          {OPTIONS.repeat.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
      </section>
      {value.repeat !== '안함' && (
        <section>
          <Menu isLazy>
            <MenuButton w="full">
              <HStack justifyContent="space-between">
                <Text decoration="underline">반복 종료일</Text>
                <Text>
                  {value?.endDate
                    ? format(value.endDate, 'yyyy.MM.dd')
                    : '설정 안함'}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>
              <Controller
                control={control}
                name="repeat.endDate"
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
          </Menu>
        </section>
      )}
    </FormControl>
  )
}

export default memo(RepeatField)
