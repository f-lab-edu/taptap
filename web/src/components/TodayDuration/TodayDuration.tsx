import React, { memo, useMemo } from 'react'

import { VStack } from '@chakra-ui/react'
import { format } from 'date-fns'
import { startOfDay } from 'date-fns'
import { ko } from 'date-fns/locale'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

import { GET_TOTAL_DURATION } from 'src/graphql/duration'

const TodayDuration = () => {
  const {
    data: {
      duration: { hours, minutes, seconds },
    },
  } = useSuspenseQuery(GET_TOTAL_DURATION, {
    variables: { date: startOfDay(new Date()).toISOString() },
  })

  return (
    <VStack spacing="1">
      <p className="font-medium text-slate-500">
        {format(new Date(), 'yyyy. MM. dd. eee', { locale: ko })}
      </p>
      <p className="text-6xl text-slate-900">{`${hours}:${minutes}:${seconds}`}</p>
    </VStack>
  )
}

export default memo(TodayDuration)
