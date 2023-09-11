import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'

import Toggle from 'src/components/Toggle/Toggle'

import type {
  DeleteCategoryMutationVariables,
  FindCategoryById,
  UpdateCategoryInput,
} from 'types/graphql'
import { styled } from 'styled-components'
import tw from 'twin.macro'
import { Toolbox } from 'src/components/Toolbox/Toolbox'
import IconButton from 'src/components/Buttons/IconButton'
import CategoryForm from '../CategoryForm/CategoryForm'
import { useRef, useState } from 'react'
import { QUERY as GET_CATEGORIES } from '../CategoriesCell'
import useBoolean from 'src/hooks/useBoolean'

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategoryMutation($id: Int!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      createdAt
      title
    }
  }
`

interface Props {
  category: NonNullable<FindCategoryById['category']>
}

const Category = ({ category }: Props) => {
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    refetchQueries: [GET_CATEGORIES],
    onCompleted: () => {
      toast.success('Category deleted')
      navigate(routes.categories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCategoryMutationVariables['id']) => {
    if (!isEmpty(category.tasks)) {
      toast.error('하위 할 일 목록이 있어 삭제할 수 없습니다.')
      return
    }

    if (confirm('정말 삭제하시겠습니까?')) {
      deleteCategory({ variables: { id } })
    }
  }

  const [updateCategory, { loading, error }] = useMutation(
    UPDATE_CATEGORY_MUTATION,
    {
      refetchQueries: [GET_CATEGORIES],
      onCompleted: () => {
        toast.success('Category updated')
        navigate(routes.categories())
      },
      onError: (error) => {
        console.log('에러난거야')
        toast.error(error.message)
      },
    }
  )

  const titleRef = useRef<HTMLInputElement>(null)
  const { on: editing, turnOn: onEditStart, turnOff: onEditEnd } = useBoolean()
  const onEditClick = () => {
    onEditStart()
    titleRef.current.focus()
  }

  const onSave = (
    input: UpdateCategoryInput,
    id: FindCategoryById['category']['id']
  ) => {
    updateCategory({ variables: { id, input } })
  }

  return (
    <Toggle>
      {/* 카테고리 */}
      <div className="flex py-2">
        <IconButton icon={<HiOutlineMenuAlt4 />} />
        <Toggle.Trigger className="w-full">
          {/* 폼 */}
          <CategoryForm
            ref={titleRef}
            category={category}
            onSave={onSave}
            error={error}
            loading={loading}
            editing={editing}
            onEditEnd={onEditEnd}
          />
        </Toggle.Trigger>

        <Toolbox
          onEdit={onEditClick}
          onDelete={() => onDeleteClick(category.id)}
        />
      </div>
      {/* 할일 */}
      <Toggle.Panel>
        <ul className="ml-8">
          {category.tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-4 pb-2 text-sm text-slate-500"
            >
              <HiOutlineMenuAlt4 />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </Toggle.Panel>
    </Toggle>
  )
}

export default Category
// TODO: 시멘틱
// padding 여백같은건 나중에 다듬자

const isEmpty = (obj = {}) => Object.keys(obj).length == 0
