import { Duration, endOfDay, intervalToDuration, startOfDay } from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  RecordRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

const add = (d1: Duration, d2: Duration) => {
  const _add = (a, b = 0) => a + b
  for (const [k, v] of Object.entries(d2)) {
    d1[k] = _add(v, d1[k])
  }
}

export const records: QueryResolvers['records'] = async ({ date, taskId }) => {
  console.log('taskId', taskId)
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

  const duration = {} as Duration
  data.forEach(({ start, end }) => {
    add(duration, intervalToDuration({ start, end }))
  })

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
