import { addHours } from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  RecordRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const records: QueryResolvers['records'] = ({ date, taskId }) => {
  const start = new Date(date),
    end = addHours(new Date(date), 24)
  const where = {
    task: {
      category: {
        userId: context.currentUser.id,
      },
    },
    start: {
      lt: end,
    },
    end: {
      gt: start,
    },
    ...(taskId ? { taskId } : {}),
  }
  return db.record.findMany({ where, include: { task: true } })
}

export const createRecord: MutationResolvers['createRecord'] = ({ input }) => {
  return db.record.create({
    data: input,
    include: {
      task: true,
    },
  })
}

export const updateRecord: MutationResolvers['updateRecord'] = ({
  id,
  input,
}) => {
  return db.record.update({
    data: input,
    where: { id },
    include: {
      task: true,
    },
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
