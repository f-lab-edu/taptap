import type { FindRepeats } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Repeats from 'src/components/Repeat/Repeats'

export const QUERY = gql`
  query FindRepeats {
    repeats {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No repeats yet. '}
      <Link to={routes.newRepeat()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ repeats }: CellSuccessProps<FindRepeats>) => {
  return <Repeats repeats={repeats} />
}
