import type {
  QueryResolvers,
  MutationResolvers,
  DayOfWeekRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const dayOfWeeks: QueryResolvers['dayOfWeeks'] = () => {
  return db.dayOfWeek.findMany()
}

export const dayOfWeek: QueryResolvers['dayOfWeek'] = ({ id }) => {
  return db.dayOfWeek.findUnique({
    where: { id },
  })
}

export const createDayOfWeek: MutationResolvers['createDayOfWeek'] = ({
  input,
}) => {
  return db.dayOfWeek.create({
    data: input,
  })
}

export const updateDayOfWeek: MutationResolvers['updateDayOfWeek'] = ({
  id,
  input,
}) => {
  return db.dayOfWeek.update({
    data: input,
    where: { id },
  })
}

export const deleteDayOfWeek: MutationResolvers['deleteDayOfWeek'] = ({
  id,
}) => {
  return db.dayOfWeek.delete({
    where: { id },
  })
}

export const DayOfWeek: DayOfWeekRelationResolvers = {
  repeats: (_obj, { root }) => {
    return db.dayOfWeek.findUnique({ where: { id: root?.id } }).repeats()
  },
}
