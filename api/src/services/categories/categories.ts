import type {
  QueryResolvers,
  MutationResolvers,
  CategoryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

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

export const updateCategory: MutationResolvers['updateCategory'] = ({
  id,
  input,
}) => {
  return db.category.update({
    data: input,
    where: { id },
  })
}

export const deleteCategory: MutationResolvers['deleteCategory'] = ({ id }) => {
  return db.category.delete({
    where: { id },
  })
}

export const Category: CategoryRelationResolvers = {
  tasks: (_obj, { root }) => {
    return db.category.findUnique({ where: { id: root?.id } }).tasks()
  },
}
