import { Duration, endOfDay, intervalToDuration, startOfDay } from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  RecordRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

const addDuration = (d1: Duration, d2: Duration) => {
  const added = { ...d1 }
  for (const [k, v] of Object.entries(d2)) {
    added[k] = added[k] ? added[k] + v : v
  }
  return added
}

export const records: QueryResolvers['records'] = async ({
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
  const data = await db.record.findMany({ where })

  const duration = data
    .map(({ start, end }) => intervalToDuration({ start, end }))
    .reduce(addDuration, {})

  return { duration, list: data }
}

export const record: QueryResolvers['record'] = ({ id }) => {
  return db.record.findUnique({
    where: { id },
  })
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
    return db.record.findUnique({ where: { id: root?.id } }).task()
  },
}
