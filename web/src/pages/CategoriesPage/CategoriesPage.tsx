import { MetaTags } from '@redwoodjs/web'

import CategoriesCell from 'src/components/Category/CategoriesCell'

const CategoriesPage = () => {
  return (
    <>
      <MetaTags title="Categories" description="Categories page" />

      <CategoriesCell />
    </>
  )
}

export default CategoriesPage
