import type { Prisma, Record } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RecordCreateArgs>({
  record: {
    one: {
      data: {
        updatedAt: '2023-09-05T09:09:15.560Z',
        start: '2023-09-05T09:09:15.560Z',
        end: '2023-09-05T09:09:15.560Z',
        task: {
          create: {
            updatedAt: '2023-09-05T09:09:15.560Z',
            title: 'String',
            color: 'String',
            description: 'String',
            category: { create: { title: 'String' } },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-09-05T09:09:15.560Z',
        start: '2023-09-05T09:09:15.560Z',
        end: '2023-09-05T09:09:15.560Z',
        task: {
          create: {
            updatedAt: '2023-09-05T09:09:15.560Z',
            title: 'String',
            color: 'String',
            description: 'String',
            category: { create: { title: 'String' } },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Record, 'record'>
