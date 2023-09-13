import type { FindCategories } from 'types/graphql'

import Category from '../Category/Category'

const CategoriesList = ({ categories }: FindCategories) => {
  return (
    <>
      {categories.map((category) => (
        <Category category={category} />
      ))}
    </>
  )
}

export default CategoriesList
