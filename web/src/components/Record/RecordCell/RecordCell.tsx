import type { FindRecordById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Record from 'src/components/Record/Record'

export const QUERY = gql`
  query FindRecordById($id: Int!) {
    record: record(id: $id) {
      id
      createdAt
      updatedAt
      start
      end
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Record not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ record }: CellSuccessProps<FindRecordById>) => {
  return <Record record={record} />
}
