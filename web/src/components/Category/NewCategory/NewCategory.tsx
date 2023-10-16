import { Center, Flex, IconButton } from '@chakra-ui/react'
import { Bars2Icon, PlusSmallIcon } from '@heroicons/react/20/solid'
import type { CreateCategoryInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CategoryForm from 'src/components/Category/CategoryForm'
import useBoolean from 'src/hooks/useBoolean'

import { QUERY as GET_CATEGORIES } from '../CategoriesCell'

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
    <Flex align="center" px="4" py="2">
      <Bars2Icon className="mx-3 h-4 w-4" />
      <CategoryForm
        onSave={onSave}
        loading={loading}
        error={error}
        editing
        onEditEnd={onEditEnd}
      />
    </Flex>
  ) : (
    <Center my="8">
      <IconButton
        isRound
        aria-label="add new category"
        onClick={onEditStart}
        colorScheme="teal"
        icon={<PlusSmallIcon className="w-7" />}
      />
    </Center>
  )
}

export default NewCategory
