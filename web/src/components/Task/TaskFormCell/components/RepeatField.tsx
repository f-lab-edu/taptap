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

import { REPEAT_OPTIONS } from '../TaskForm.utils'

const RepeatField = () => {
  const { control, register } = useFormContext()
  const value = useWatch({ name: 'repeat' })
  return (
    <FormControl as="fieldset" display="flex" flexDirection="column" gap="2">
      <FormLabel as="legend">반복설정</FormLabel>
      <section>
        {/* <Menu>
          <MenuButton as="div">
            <BasicSelect value={value?.repeat} placeholder="반복" isReadOnly />
          </MenuButton>
          <MenuList>
            <MenuOptionGroup {...register('repeat.repeat')}>
              {repeatOptions.map(({ id, label }) => (
                <MenuItemOption key={id}>{label}</MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu> */}

        <Select placeholder="반복" {...register('repeat.repeat')}>
          {REPEAT_OPTIONS.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
      </section>
      <section>
        <Menu isLazy>
          <MenuButton w="full">
            <HStack justifyContent="space-between">
              <Text decoration="underline">반복 종료</Text>
              <Text>
                {value?.endDate ? format(value.endDate, 'yyyy.MM.dd') : '안함'}
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
    </FormControl>
  )
}

export default memo(RepeatField)
