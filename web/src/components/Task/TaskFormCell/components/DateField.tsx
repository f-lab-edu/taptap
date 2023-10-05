import React, { useRef } from 'react'

import { useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { useFormContext, Controller, useWatch } from '@redwoodjs/forms'

import BasicSelect from './BasicSelect'

const DateField = () => {
  const { control } = useFormContext()
  const { startDate } = useWatch()
  const calendarMenuRef = useRef()
  const { onClose, getButtonProps, getDisclosureProps } = useDisclosure()
  useOutsideClick({
    ref: calendarMenuRef,
    handler: onClose,
  })
  return (
    <section className="flex w-full flex-col gap-2">
      <div className="relative" {...getButtonProps()} ref={calendarMenuRef}>
        <div role="button">
          <BasicSelect
            leftIcon={CalendarDaysIcon}
            value={format(startDate, 'yyyy.MM.dd')}
            aria-label="시작일"
            isReadOnly
          />
        </div>
        <div
          {...getDisclosureProps()}
          // ref={calendarMenuRef}
          className="absolute right-0 top-[100%] z-50 mt-2 rounded-lg bg-white p-2 shadow-lg"
        >
          <Controller
            control={control}
            name="startDate"
            render={({ field: { onChange, value, onBlur } }) => (
              <DayPicker
                mode="single"
                onDayBlur={onBlur}
                onSelect={(e) => {
                  console.log('change')
                  onChange(e)
                  // onClose()
                }}
                selected={value}
              />
            )}
          />
        </div>
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
    </section>
  )
}

export default DateField
