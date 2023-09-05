import type { FindRecords } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Records from 'src/components/Record/Records'

export const QUERY = gql`
  query FindRecords {
    records {
      id
      createdAt
      updatedAt
      start
      end
      taskId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No records yet. '}
      <Link to={routes.newRecord()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ records }: CellSuccessProps<FindRecords>) => {
  return <Records records={records} />
}
