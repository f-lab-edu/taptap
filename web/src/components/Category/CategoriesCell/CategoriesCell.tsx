import type { FindCategories } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Categories from 'src/components/Category/Categories'
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

// TODO
export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No categories yet. '}
      <button>{'Create one?'}</button>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ categories }: CellSuccessProps<FindCategories>) => {
  return (
    <>
      <Categories categories={categories} />
      <NewCategory />
    </>
  )
}
