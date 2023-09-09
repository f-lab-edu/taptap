import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { RiMore2Fill } from 'react-icons/ri'
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

  const titleInputRef = useRef<HTMLInputElement>(null)
  const onEditClick = () => {
    titleInputRef.current.focus()
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
        <Toggle.Button className="w-full">
          {/* 폼 */}
          <CategoryForm
            ref={titleInputRef}
            category={category}
            onSave={onSave}
            error={error}
            loading={loading}
          />
        </Toggle.Button>

        <Toolbox
          onEdit={onEditClick}
          onDelete={() => onDeleteClick(category.id)}
        />
      </div>
      {/* 할일 */}
      <Toggle.List>
        <ul className="ml-8">
          {category.tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-4 pb-2 text-sm text-slate-500	"
            >
              <HiOutlineMenuAlt4 />
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      </Toggle.List>
    </Toggle>
  )
}

export default Category
// TODO: 시멘틱
// 이렇게 작은 컴포넌트에서 header 태그를 써도 되나?
// padding 여백같은건 나중에 다듬자
// icon 같은 건 어떻게 넣지?

const isEmpty = (obj = {}) => Object.keys(obj).length == 0
