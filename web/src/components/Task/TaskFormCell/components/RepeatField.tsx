import React from 'react'

import {
  FormControl,
  FormLabel,
  Text,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  Select,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { Controller, useFormContext, useWatch } from '@redwoodjs/forms'

import BasicSelect from './BasicSelect'

const repeatOptions = [
  '안함',
  '매일',
  '평일',
  '주말',
  '매주',
  '매월',
  '매년',
].map((label, idx) => ({ id: idx, label }))

// 배열로 하거나
// 객체로 따로 데이터 정제
// 결국 데이터 정제는 필요한데,
// 뭐가 더 편할 것인가
// => submit할 때 바꾸자 데이터

const RepeatField = () => {
  const { control, register } = useFormContext()
  const value = useWatch({ name: 'repeat' })
  console.log('repeat', value)
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
          {repeatOptions.map(({ id, label }) => (
            <option key={id}>{label}</option>
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

export default RepeatField
