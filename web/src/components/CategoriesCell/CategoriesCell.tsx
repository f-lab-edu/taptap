import type { FindCategories } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Category from './components/Category/Category'

import NewCategory from './components/NewCategory/NewCategory'

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

export const Empty = () => <NewCategory />

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
