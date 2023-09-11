import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { AiOutlinePlusCircle } from 'react-icons/ai'

import { QUERY as GET_CATEGORIES } from '../CategoriesCell'
import type { CreateCategoryInput } from 'types/graphql'

import CategoryForm from 'src/components/Category/CategoryForm'
import IconButton from 'src/components/Buttons/IconButton'
import { useRef, useState } from 'react'
import useBoolean from 'src/hooks/useBoolean'

const CREATE_CATEGORY_MUTATION = gql`
  mutation CreateCategoryMutation($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
    }
  }
`

const NewCategory = () => {
  const [createCategory, { loading, error }] = useMutation(
    CREATE_CATEGORY_MUTATION,
    {
      refetchQueries: [GET_CATEGORIES],
      onCompleted: () => {
        toast.success('Category created')
        navigate(routes.categories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateCategoryInput) => {
    createCategory({ variables: { input } })
  }

  const { on: editing, turnOn: onEditStart, turnOff: onEditEnd } = useBoolean()

  return editing ? (
    <div className="flex py-2">
      <IconButton icon={<HiOutlineMenuAlt4 />} />
      <CategoryForm
        onSave={onSave}
        loading={loading}
        error={error}
        editing
        onEditEnd={onEditEnd}
      />
    </div>
  ) : (
    <IconButton icon={<AiOutlinePlusCircle onClick={onEditStart} />} />
  )
}

export default NewCategory
