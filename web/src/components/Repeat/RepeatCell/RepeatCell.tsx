import type { FindRepeatById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Repeat from 'src/components/Repeat/Repeat'

export const QUERY = gql`
  query FindRepeatById($id: Int!) {
    repeat: repeat(id: $id) {
      id
      createdAt
      updatedAt
      startDate
      startTime
      endDate
      endTime
      type
      interval
      daysOfMonth
      weekOfMonth
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Repeat not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ repeat }: CellSuccessProps<FindRepeatById>) => {
  return <Repeat repeat={repeat} />
}
