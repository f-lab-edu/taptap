import React, { useMemo } from 'react'

import { Checkbox, Box, HStack } from '@chakra-ui/react'
import { addHours, roundToNearestMinutes } from 'date-fns'

import { Controller, useFormContext } from '@redwoodjs/forms'

import TimeSelect from './components/TimeSelect'
import { timeFormat } from './TimeField.config'

const TimeField = () => {
  const { control } = useFormContext()
  return (
    <div className="flex flex-col-reverse gap-2">
      <Checkbox defaultChecked className="peer" data-peer>
        종일
      </Checkbox>
      <Box _peerChecked={{ h: '0px', overflow: 'hidden' }}>
        <HStack>
          <Controller
            name={`times.${0}.${0}`}
            control={control}
            render={(props) => (
              <TimeSelect
                {...props}
                inputProps={{ 'aria-label': '시작시간' }}
              />
            )}
          />

          <Controller
            name={`times.${0}.${1}`}
            control={control}
            render={(props) => (
              <TimeSelect
                {...props}
                inputProps={{ 'aria-label': '종료시간' }}
              />
            )}
          />
        </HStack>
      </Box>
    </div>
  )
}

export default TimeField
