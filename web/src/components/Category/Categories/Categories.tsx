import type { FindCategories } from 'types/graphql'
import Category from '../Category/Category'

const CategoriesList = ({ categories }: FindCategories) => {
  return (
    <div>
      {categories.map((category) => (
        <Category key={category.id} category={category} />
      ))}
    </div>
  )
}

export default CategoriesList
