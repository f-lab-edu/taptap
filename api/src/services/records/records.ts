import { endOfDay, startOfDay } from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  RecordRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const records: QueryResolvers['records'] = ({
  date = new Date(),
  taskId,
}) => {
  const where = {
    start: {
      gte: startOfDay(new Date(date)),
    },
    end: {
      lte: endOfDay(new Date(date)),
    },
    ...(taskId ? { taskId } : {}),
  }
  return db.record.findMany({ where, include: { task: true } })
}

export const createRecord: MutationResolvers['createRecord'] = ({ input }) => {
  return db.record.create({
    data: input,
  })
}

export const updateRecord: MutationResolvers['updateRecord'] = ({
  id,
  input,
}) => {
  return db.record.update({
    data: input,
    where: { id },
  })
}

export const deleteRecord: MutationResolvers['deleteRecord'] = ({ id }) => {
  return db.record.delete({
    where: { id },
  })
}

export const Record: RecordRelationResolvers = {
  task: (_obj, { root }) => {
    return root.task
  },
}
