import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { ForbiddenError } from '@redwoodjs/graphql-server'

const verifyOwnership = async ({ id }) => {
  if (await category({ id })) {
    return true
  } else {
    throw new ForbiddenError("You don't have access to this category")
  }
}

export const categories: QueryResolvers['categories'] = () => {
  return db.category.findMany({ where: { userId: context.currentUser.id } })
}

export const category: QueryResolvers['category'] = ({ id }) => {
  return db.category.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createCategory: MutationResolvers['createCategory'] = ({
  input,
}) => {
  return db.category.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const updateCategory: MutationResolvers['updateCategory'] = async ({
  id,
  input,
}) => {
  await verifyOwnership({ id })
  return db.category.update({
    data: input,
    where: { id },
  })
}

export const deleteCategory: MutationResolvers['deleteCategory'] = async ({
  id,
}) => {
  await verifyOwnership({ id })
  return db.category.delete({
    where: { id },
  })
}

export const Category: CategoryRelationResolvers = {
  tasks: (_obj, { root }) => {
    return db.category.findUnique({ where: { id: root?.id } }).tasks()
  },
}
