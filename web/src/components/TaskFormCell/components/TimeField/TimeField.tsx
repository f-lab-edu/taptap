import React, { memo } from 'react'

import { Checkbox, HStack, FormLabel, IconButton, Flex } from '@chakra-ui/react'
import { MinusCircleIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { addHours } from 'date-fns'

import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from '@redwoodjs/forms'

import { getDefaultTimes, timeFormat } from '../../TaskForm.utils'

import TimeSelect from './components/TimeSelect'
import { getTimeOptions, timestringToDate } from './TimeField.utils'

const TimeField = () => {
  const { control, setValue, register } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'times.data',
  })
  const { allDay, data: times } = useWatch({ name: 'times' })
  return (
    <fieldset className="w-full">
      <HStack justifyContent="space-between" alignItems="center">
        <FormLabel as="legend">시간</FormLabel>
        {!allDay && (
          <IconButton
            aria-label="add new"
            type="button"
            variant="unstyled"
            size="xs"
            color="gray.500"
            icon={<PlusCircleIcon />}
            onClick={() => append([getDefaultTimes().map(timeFormat)])}
          />
        )}
      </HStack>
      <div className="flex flex-col-reverse gap-2">
        <Checkbox className="peer" data-peer {...register('times.allDay')}>
          종일
        </Checkbox>
        <Flex _peerChecked={{ display: 'none' }} gap="2" direction="column">
          {fields.map((field, idx) => (
            <HStack key={field.id}>
              <Controller
                name={`times.data.${idx}.${0}`}
                control={control}
                render={(props) => (
                  <TimeSelect
                    {...props}
                    field={{
                      ...props.field,
                      onChange: (e) => {
                        props.field.onChange(e)
                        setValue(
                          `times.data.${idx}.${1}`,
                          timeFormat(addHours(timestringToDate(e), 1))
                        )
                      },
                    }}
                    inputProps={{
                      'aria-label': '시작시간',
                    }}
                  />
                )}
              />

              <Controller
                name={`times.data.${idx}.${1}`}
                control={control}
                render={(props) => (
                  <TimeSelect
                    {...props}
                    inputProps={{
                      'aria-label': '종료시간',
                    }}
                    options={getTimeOptions({
                      start: times[idx]
                        ? timestringToDate(times[idx][0])
                        : getDefaultTimes()[0],
                    })}
                  />
                )}
              />

              <IconButton
                variant="unstyled"
                type="button"
                aria-label="remove"
                size="xs"
                color="gray.300"
                icon={<MinusCircleIcon />}
                onClick={() => remove(idx)}
              />
            </HStack>
          ))}
        </Flex>
      </div>
    </fieldset>
  )
}

export default memo(TimeField)
