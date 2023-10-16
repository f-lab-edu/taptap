import { useCallback, useRef } from 'react'

import {
  IconButton,
  Flex,
  Box,
  useDisclosure,
  Collapse,
  Button,
  useBoolean,
} from '@chakra-ui/react'
import { Bars2Icon } from '@heroicons/react/20/solid'
import type {
  DeleteCategoryMutationVariables,
  FindCategories,
  UpdateCategoryInput,
} from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Toolbox from 'src/components/Toolbox/Toolbox'

import { QUERY as GET_CATEGORIES } from '../../CategoriesCell'
import CategoryForm from '../CategoryForm/CategoryForm'

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
  category: NonNullable<FindCategories['categories'][0]>
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
        toast.error(error.message)
      },
    }
  )

  const titleRef = useRef<HTMLInputElement>(null)
  const [editing, { on: onEditStart, off: onEditEnd }] = useBoolean()
  const onEditClick = useCallback(() => {
    onEditStart()
    titleRef.current.focus()
  }, [onEditStart])

  const onSave = useCallback(
    (input: UpdateCategoryInput, id: FindCategories['categories'][0]['id']) => {
      updateCategory({ variables: { id, input } })
    },
    [updateCategory]
  )

  const { isOpen, getButtonProps, getDisclosureProps } = useDisclosure()

  return (
    <>
      {/* 카테고리 */}
      <Flex align="center" px="4" py="2" _hover={{ bg: 'gray.50' }}>
        <IconButton
          variant="unstyled"
          aria-label="order-controller"
          icon={<Bars2Icon className="h-4 w-4" />}
        />
        <Button
          as="div"
          {...getButtonProps()}
          variant="unstyled"
          flex="1"
          cursor="pointer"
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
        </Button>
        <Toolbox
          items={[
            { label: '수정', onClick: onEditClick },
            { label: '삭제', onClick: () => onDeleteClick(category.id) },
          ]}
        />
      </Flex>
      {/* 하위 할 일 항목 */}
      <Collapse {...getDisclosureProps()} in={isOpen}>
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

export default React.memo(Category)

const isEmpty = (obj = {}) => Object.keys(obj).length == 0
