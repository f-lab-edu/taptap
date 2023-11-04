import {
  isSameDay,
  isAfter,
  isBefore,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  getDay,
  getWeek,
  getDate,
  getMonth,
} from 'date-fns'
import type {
  QueryResolvers,
  MutationResolvers,
  TaskRelationResolvers,
  RepeatType,
  Task as TaskData,
} from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

import { records } from '../records/records'

const verifyOwnership = async ({ id }) => {
  if (await task({ id })) {
    return true
  } else {
    throw new ForbiddenError("You don't have access to this category")
  }
}

type DifferenceMap = {
  [key in RepeatType]: (
    dateLeft: Date | number,
    dateRight: Date | number
  ) => number
}

const differenceIn: DifferenceMap = {
  Daily: differenceInDays,
  Weekly: differenceInWeeks,
  Monthly: differenceInMonths,
  Yearly: differenceInYears,
}

const empty = (arr) => Array.isArray(arr) && arr.length === 0

const isPlaned =
  (date = new Date()) =>
  (task: TaskData): boolean => {
    const startDate = new Date(task.startDate)
    if (!task.repeat) {
      return isSameDay(startDate, date)
    }

    const {
      type,
      interval,
      endDate,
      months,
      daysOfMonth,
      weekOfMonth,
      daysOfWeek,
    } = task.repeat
    if (
      isBefore(date, startDate) ||
      (endDate && isAfter(date, new Date(endDate)))
    ) {
      return false
    }

    if (differenceIn[type](date, startDate) % interval !== 0) {
      return false
    }
    if (!empty(daysOfWeek) && !daysOfWeek.includes(getDay(date))) {
      return false
    }
    if (weekOfMonth && weekOfMonth !== getWeek(date)) {
      return false
    }
    if (!empty(daysOfMonth) && !daysOfMonth.includes(getDate(date))) {
      return false
    }
    if (!empty(months) && !months.includes(getMonth(date))) {
      return false
    }

    return true
  }

export const tasks: QueryResolvers['tasks'] = async ({ date = new Date() }) => {
  const data = await db.task.findMany({
    where: {
      category: {
        userId: context.currentUser.id,
      },
    },
    include: { repeat: true },
  })
  return data.filter(isPlaned(new Date(date)))
}

export const task: QueryResolvers['task'] = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}

export const createTask: MutationResolvers['createTask'] = ({ input }) => {
  return db.task.create({
    data: input,
  })
}

export const updateTask: MutationResolvers['updateTask'] = async ({
  id,
  input,
}) => {
  await verifyOwnership({ id })
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask: MutationResolvers['deleteTask'] = async ({ id }) => {
  await verifyOwnership({ id })
  return db.task.delete({
    where: { id },
  })
}

export const Task: TaskRelationResolvers = {
  repeat: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).repeat()
  },
  records: ({ date }, { root }) => {
    return records({ date, taskId: root.id })
  },
  category: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).category()
  },
}
