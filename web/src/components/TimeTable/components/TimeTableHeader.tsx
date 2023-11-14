import React, { useRef } from 'react'

import { useDisclosure, useOutsideClick } from '@chakra-ui/react'
import { DayPicker } from 'react-day-picker'

import { Controller, useFormContext } from '@redwoodjs/forms'

// 진행중!
const TimeTableHeader = () => {
  const { control } = useFormContext()
  const container = useRef<HTMLDivElement>(null)
  const { onClose, onOpen, isOpen } = useDisclosure()
  useOutsideClick({
    ref: container,
    handler: onClose,
  })
  return (
    <div ref={container}>
      <button>이전 달</button>
      <Controller
        name="date"
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <div>
            <input
              ref={ref}
              value={value}
              onFocus={onOpen}
              onChange={onChange}
              aria-controls="time-talbe-date-menu"
            />
            <div hidden={!isOpen} id="time-talbe-date-menu">
              <DayPicker
                onDayBlur={onBlur}
                selected={value}
                onSelect={(e) => onChange(e)}
              />
            </div>
          </div>
        )}
      />
      <button>다음 달</button>
    </div>
  )
}

export default TimeTableHeader
