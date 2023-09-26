import type { QueryResolvers, RepeatRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const repeats: QueryResolvers['repeats'] = () => {
  return db.repeat.findMany()
}

export const repeat: QueryResolvers['repeat'] = ({ id }) => {
  return db.repeat.findUnique({
    where: { id },
  })
}

export const Repeat: RepeatRelationResolvers = {
  daysOfWeek: (_obj, { root }) => {
    return db.repeat.findUnique({ where: { id: root?.id } }).daysOfWeek()
  },
  task: (_obj, { root }) => {
    return db.repeat.findUnique({ where: { id: root?.id } }).task()
  },
}
