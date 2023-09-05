import type { Prisma, Record } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RecordCreateArgs>({
  record: {
    one: {
      data: {
        updatedAt: '2023-09-05T09:05:29.684Z',
        start: '2023-09-05T09:05:29.684Z',
        end: '2023-09-05T09:05:29.684Z',
      },
    },
    two: {
      data: {
        updatedAt: '2023-09-05T09:05:29.684Z',
        start: '2023-09-05T09:05:29.684Z',
        end: '2023-09-05T09:05:29.684Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Record, 'record'>
