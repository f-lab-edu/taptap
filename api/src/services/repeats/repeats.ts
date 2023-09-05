import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const repeats: QueryResolvers['repeats'] = () => {
  return db.repeat.findMany()
}

export const repeat: QueryResolvers['repeat'] = ({ id }) => {
  return db.repeat.findUnique({
    where: { id },
  })
}

export const createRepeat: MutationResolvers['createRepeat'] = ({ input }) => {
  return db.repeat.create({
    data: input,
  })
}

export const updateRepeat: MutationResolvers['updateRepeat'] = ({
  id,
  input,
}) => {
  return db.repeat.update({
    data: input,
    where: { id },
  })
}

export const deleteRepeat: MutationResolvers['deleteRepeat'] = ({ id }) => {
  return db.repeat.delete({
    where: { id },
  })
}
