import React, { memo } from 'react'

import {
  InputProps,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react'
import { ClockIcon } from '@heroicons/react/24/outline'

import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from '@redwoodjs/forms'

import BasicSelect from '../../BasicSelect'
import { getTimeOptions, timeFormat } from '../TimeField.config'

interface Props extends InputProps {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<FieldValues>
  inputProps: InputProps
  options?: Date[]
}

// ref
const TimeSelect = ({
  field: { value, name, onChange },
  inputProps,
  options = getTimeOptions(),
}: Props) => (
  <Menu>
    <MenuButton as="div">
      <BasicSelect
        {...inputProps}
        {...{ name, value, onChange }}
        leftIcon={ClockIcon}
      />
    </MenuButton>
    <MenuList h="200px" overflowY="auto">
      <MenuOptionGroup type="radio" {...{ name, value, onChange }}>
        {options.map((date) => (
          <MenuItemOption key={date.toISOString()} value={timeFormat(date)}>
            {timeFormat(date)}
          </MenuItemOption>
        ))}
      </MenuOptionGroup>
    </MenuList>
  </Menu>
)

export default memo(TimeSelect)
