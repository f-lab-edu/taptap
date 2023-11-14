import {
  InMemoryCacheConfig,
  createFragmentRegistry,
} from '@apollo/client/cache'
import { records as RecordsType } from 'types/graphql'

import { formatDuration, intervalListToDuration } from 'src/lib/formatters'

import { RECORDS_FIELDS_FOR_DURATION, TASK_DURATION } from '../duration'

export const typePolicies: InMemoryCacheConfig['typePolicies'] = {
  Query: {
    fields: {
      duration: {
        read(_, { cache, variables: { date } }) {
          const data = cache.readQuery({
            query: gql`
              ${RECORDS_FIELDS_FOR_DURATION}
              query records($date: DateTime) {
                records(date: $date) {
                  ...RecordsFields
                }
              }
            `,
            variables: {
              date,
            },
          }) as RecordsType
          const records = data?.records
          return formatDuration(intervalListToDuration(records))
        },
      },
    },
  },
  Task: {
    keyFields: ['id', 'date'],
    fields: {
      date: {
        read(_, { variables }) {
          return variables.date || 'all'
        },
      },
      duration: {
        read(_, { readField }) {
          const recordRefs = readField('records')
          const records = (
            recordRefs && Array.isArray(recordRefs)
              ? recordRefs.map((ref) => ({
                  start: readField('start', ref),
                  end: readField('end', ref),
                }))
              : []
          ) as Interval[]
          return intervalListToDuration(records)
        },
      },
    },
  },
}

const fragments: InMemoryCacheConfig['fragments'] =
  createFragmentRegistry(TASK_DURATION)

export default { typePolicies, fragments } as InMemoryCacheConfig
