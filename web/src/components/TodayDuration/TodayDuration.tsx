import React, { useMemo } from 'react'

import { TypedDocumentNode } from '@apollo/client'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { records, recordsVariables } from 'types/graphql'

import { useSuspenseQuery } from '@redwoodjs/web/dist/components/GraphQLHooksProvider'

const GET_TODAY_DURATION: TypedDocumentNode<records, recordsVariables> = gql`
  query records($date: Date!) {
    records(date: $date) {
      duration {
        hours
        minutes
        seconds
      }
    }
  }
`

const TodayDuration = () => {
  const today = useMemo(() => new Date(), [])
  const {
    data: {
      records: {
        duration: { hours, minutes, seconds },
      },
    },
  } = useSuspenseQuery(GET_TODAY_DURATION, {
    variables: {
      date: format(today, 'yyyy-MM-dd'),
    },
  })
  return (
    <div>
      <p>{format(today, 'yyyy. MM. dd. eee', { locale: ko })}</p>
      <p>{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  )
}

export default TodayDuration
