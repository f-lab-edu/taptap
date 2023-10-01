import React, { useRef } from 'react'

import {
  Icon,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  useOutsideClick,
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline'
import {
  eachMinuteOfInterval,
  endOfToday,
  format,
  getUnixTime,
  startOfToday,
} from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { useFormContext, Controller, useWatch } from '@redwoodjs/forms'

const DateTimeField = () => {
  const { register, control } = useFormContext()
  const { startDate } = useWatch()
  const calendarMenuRef = useRef()
  const { onClose, getButtonProps, getDisclosureProps } = useDisclosure()
  useOutsideClick({
    ref: calendarMenuRef,
    handler: onClose,
  })
  return (
    <div className="relative">
      <InputGroup {...getButtonProps()}>
        <InputLeftElement>
          <Icon as={CalendarDaysIcon} color="gray.400" />
        </InputLeftElement>
        <Input
          value={startDate}
          aria-label="시작일"
          className="cursor-pointer"
        />
        <InputRightElement>
          <Icon as={ChevronDownIcon} strokeWidth="2" />
        </InputRightElement>
      </InputGroup>
      <div
        ref={calendarMenuRef}
        className="absolute right-0 top-[100%] z-50 mt-2 rounded-lg bg-white p-2 shadow-lg"
        {...getDisclosureProps()}
      >
        <Controller
          control={control}
          name="startDate"
          render={({ field: { onChange, value, onBlur } }) => (
            <DayPicker
              mode="single"
              onDayBlur={onBlur}
              onSelect={(e) => {
                onChange(e)
                onClose()
              }}
              selected={value}
            />
          )}
        />
      </div>
      {/* 객체처럼 key-value로 만들어야겟다 */}
      {/* <HStack>
        <Select {...register('times')}>
          {timeOptions.map((time) => (
            <option key={getUnixTime(time)}>{format(time, 'HH:mm')}</option>
          ))}
        </Select>
        <Select {...register('endTime')}>
          <option>9:00</option>
          <option>10:00</option>
        </Select>
      </HStack> */}
    </div>
  )
}

export default DateTimeField

const timeOptions = eachMinuteOfInterval(
  {
    start: startOfToday(),
    end: endOfToday(),
  },
  { step: 10 }
)
