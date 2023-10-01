import type { FindCategories } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Category from '../Category'
import NewCategory from '../NewCategory/NewCategory'

export const QUERY = gql`
  query FindCategories {
    categories {
      id
      createdAt
      title
      tasks {
        id
        title
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return <NewCategory />
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ categories }: CellSuccessProps<FindCategories>) => {
  return (
    <>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
      <NewCategory />
    </>
  )
}
