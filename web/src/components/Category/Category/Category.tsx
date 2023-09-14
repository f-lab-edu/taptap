import { useRef } from 'react'
import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import {
  IconButton,
  Flex,
  Box,
  useDisclosure,
  Collapse,
  Button,
} from '@chakra-ui/react'
import { Bars2Icon } from '@heroicons/react/20/solid'

import type {
  DeleteCategoryMutationVariables,
  FindCategoryById,
  UpdateCategoryInput,
} from 'types/graphql'
import { QUERY as GET_CATEGORIES } from '../CategoriesCell'

import { Toolbox } from 'src/components/Toolbox/Toolbox'
import CategoryForm from '../CategoryForm/CategoryForm'
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

  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      {/* 카테고리 */}
      <Flex align="center" px="4" py="2" _hover={{ bg: 'gray.50' }}>
        <IconButton
          variant="ghost"
          aria-label="order-controller"
          icon={<Bars2Icon className="h-4 w-4" />}
          _hover={{}}
          _active={{}}
        />
        <Button
          variant="ghost"
          flex="1"
          onClick={onToggle}
          _hover={{}}
          _active={{}}
        >
          <CategoryForm
            ref={titleRef}
            category={category}
            onSave={onSave}
            error={error}
            loading={loading}
            editing={editing}
            onEditEnd={onEditEnd}
          />
          {/* TODO: 하위항목을 나타내는: Text */}
        </Button>
        <Toolbox
          items={[
            { label: '수정', onClick: onEditClick },
            { label: '삭제', onClick: () => onDeleteClick(category.id) },
          ]}
        />
      </Flex>
      {/* 할일 */}
      <Collapse in={isOpen}>
        <Box as="ul" ml="12">
          {category.tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-4 py-2 text-sm text-slate-600"
            >
              <Bars2Icon className="h-3 w-3" />
              <span>{task.title}</span>
            </li>
          ))}
        </Box>
      </Collapse>
    </>
  )
}

export default Category

const isEmpty = (obj = {}) => Object.keys(obj).length == 0
