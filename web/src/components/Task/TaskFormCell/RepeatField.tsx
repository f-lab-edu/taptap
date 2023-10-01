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
} from '@chakra-ui/react'
import { DayPicker } from 'react-day-picker'

import { Controller } from '@redwoodjs/forms'

const RepeatField = () => {
  return (
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
            render={({ field: { onChange, value, onBlur } }) => (
              <DayPicker
                mode="single"
                onDayBlur={onBlur}
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
      <Select placeholder="반복">
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
      </Menu>
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
  )
}

export default RepeatField
