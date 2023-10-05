import React, { useMemo } from 'react'

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
import { OPTIONS, timeFormat } from '../TimeField.config'

interface Props extends InputProps {
  field: ControllerRenderProps<FieldValues, any>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<FieldValues>
  inputProps: InputProps
}

const getNestedValue = (obj, keystring) => {
  keystring.split('.').forEach((key) => {
    obj = obj[key]
  })
  return obj
}

const TimeSelect = ({
  field: { value, onChange, name },
  formState: { defaultValues },
  inputProps,
}: Props) => {
  const defaultValue = useMemo(
    () => getNestedValue(defaultValues, name),
    [name, defaultValues]
  )
  console.log(name, defaultValue)

  return (
    <Menu>
      <MenuButton as="div">
        <BasicSelect
          {...inputProps}
          leftIcon={ClockIcon}
          value={value}
          isReadOnly
          name={name}
        />
      </MenuButton>
      <MenuList h="200px" overflowY="auto">
        <MenuOptionGroup
          type="radio"
          onChange={onChange}
          defaultValue={defaultValue}
        >
          {OPTIONS.map((date) => (
            <MenuItemOption key={date.toISOString()} value={timeFormat(date)}>
              {timeFormat(date)}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}

export default TimeSelect
