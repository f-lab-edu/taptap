import React, { useRef } from 'react'

import {
  Icon,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  useOutsideClick,
  Checkbox,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputProps,
  InputGroupProps,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarDaysIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import {
  addHours,
  eachMinuteOfInterval,
  endOfToday,
  format,
  getUnixTime,
  roundToNearestMinutes,
  startOfToday,
} from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { useFormContext, Controller, useWatch } from '@redwoodjs/forms'

type BasicInputProps = {
  leftIcon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >
  rightIcon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'>
  >
} & InputProps

const BasicInput = ({
  leftIcon,
  rightIcon = ChevronDownIcon,
  ...inputProps
}: BasicInputProps) => (
  <InputGroup>
    <InputLeftElement>
      <Icon as={leftIcon} color="gray.400" />
    </InputLeftElement>
    <Input {...inputProps} cursor="pointer" />
    <InputRightElement>
      <Icon as={rightIcon} strokeWidth="2" />
    </InputRightElement>
  </InputGroup>
)

const timeFormat = (date: Date): string => format(date, 'HH:mm')

const DateTimeField = () => {
  const { register, control } = useFormContext()
  const { startDate } = useWatch()
  const calendarMenuRef = useRef()
  const { onClose, getButtonProps, getDisclosureProps } = useDisclosure()
  useOutsideClick({
    ref: calendarMenuRef,
    handler: onClose,
  })

  const startTime = roundToNearestMinutes(new Date(), {
    nearestTo: 30,
    roundingMethod: 'ceil',
  })
  const endTime = addHours(startTime, 1)
  return (
    <section className="flex w-full flex-col gap-2">
      <div className="relative" {...getButtonProps()}>
        <div role="button">
          <BasicInput
            leftIcon={CalendarDaysIcon}
            value={format(startDate, 'yyyy.MM.dd')}
            aria-label="시작일"
            isReadOnly
          />
        </div>
        {/* <InputGroup {...getButtonProps()}>
          <InputLeftElement>
            <Icon as={CalendarDaysIcon} color="gray.400" />
          </InputLeftElement>
          <Input
            value={format(startDate, 'yyyy.MM.dd')}
            aria-label="시작일"
            className="cursor-pointer"
          />
          <InputRightElement>
            <Icon as={ChevronDownIcon} strokeWidth="2" />
          </InputRightElement>
        </InputGroup> */}
        <div
          {...getDisclosureProps()}
          ref={calendarMenuRef}
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
                  onChange(e)
                  onClose()
                }}
                selected={value}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2">
        <Checkbox defaultChecked className="peer" data-peer>
          종일
        </Checkbox>
        <Box _peerChecked={{ h: '0px', overflow: 'hidden' }}>
          <HStack>
            <Controller
              name={`times.${0}.start`}
              control={control}
              defaultValue={timeFormat(startTime)}
              render={({ field: { value, onChange } }) => (
                <Menu>
                  <MenuButton as="div">
                    <BasicInput
                      leftIcon={ClockIcon}
                      aria-label="시작 시간"
                      value={value}
                      isReadOnly
                    />
                  </MenuButton>
                  <MenuList h="200px" overflowY="auto">
                    <MenuOptionGroup
                      type="radio"
                      onChange={onChange}
                      defaultValue={timeFormat(startTime)}
                    >
                      {timeOptions.map((date) => (
                        <MenuItemOption
                          key={date.toISOString()}
                          value={timeFormat(date)}
                        >
                          {timeFormat(date)}
                        </MenuItemOption>
                      ))}
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              )}
            />

            <Menu>
              <MenuButton as="div">
                <InputGroup aria-label="종료 시간" data-peer>
                  <InputLeftElement>
                    <Icon as={ClockIcon} />
                  </InputLeftElement>
                  <Input />
                  <InputRightElement>
                    <Icon as={ChevronDownIcon} strokeWidth="2" />
                  </InputRightElement>
                </InputGroup>
              </MenuButton>
              <MenuList>
                <MenuItem>10:00</MenuItem>
                <MenuItem>10:15</MenuItem>
                <MenuItem>10:30</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Box>
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

export default DateTimeField

const timeOptions = eachMinuteOfInterval(
  {
    start: startOfToday(),
    end: endOfToday(),
  },
  { step: 10 }
)
