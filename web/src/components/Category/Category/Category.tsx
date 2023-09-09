import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { RiMore2Fill } from 'react-icons/ri'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'

import Toggle from 'src/components/Toggle/Toggle'

import type {
  DeleteCategoryMutationVariables,
  FindCategoryById,
} from 'types/graphql'
import { styled } from 'styled-components'
import tw from 'twin.macro'
import { Toolbox } from 'src/components/Toolbox/Toolbox'
import IconButton from 'src/components/Buttons/IconButton'

const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategoryMutation($id: Int!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

interface Props {
  category: Omit<NonNullable<FindCategoryById['category']>, 'createdAt'>
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
    if (confirm('Are you sure you want to delete category ' + id + '?')) {
      deleteCategory({ variables: { id } })
    }
  }

  const onEdit = () => {
    // 1. 해당 요소에 focus
    // 2. edit
    // 왜 cell이 있지? 상태 관리를 해줘야하나 해줘야지..
  }

  return (
    <Toggle>
      {/* 카테고리 */}
      <div className="flex py-2">
        <IconButton icon={<HiOutlineMenuAlt4 />} />
        <Toggle.Button className="w-full">
          <header className="text-left font-semibold">{`${category.title} (${category.tasks.length})`}</header>
        </Toggle.Button>

        <Toolbox
          onEdit={() => console.log('edit')}
          onDelete={() => onDeleteClick(category.id)}
        />
      </div>
      {/* 할일 */}
      <Toggle.List>
        <ul className="ml-8">
          {category.tasks.map((task) => (
            <li className="flex items-center gap-4 pb-2 text-sm text-slate-500	">
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
