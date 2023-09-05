import type { Prisma, Repeat } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RepeatCreateArgs>({
  repeat: {
    one: {
      data: {
        updatedAt: '2023-09-05T09:09:01.111Z',
        startDate: '2023-09-05T09:09:01.111Z',
        startTime: '2023-09-05T09:09:01.111Z',
        endDate: '2023-09-05T09:09:01.111Z',
        endTime: '2023-09-05T09:09:01.111Z',
        interval: 3551855,
        task: {
          create: {
            updatedAt: '2023-09-05T09:09:01.111Z',
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
        updatedAt: '2023-09-05T09:09:01.111Z',
        startDate: '2023-09-05T09:09:01.111Z',
        startTime: '2023-09-05T09:09:01.111Z',
        endDate: '2023-09-05T09:09:01.111Z',
        endTime: '2023-09-05T09:09:01.111Z',
        interval: 9785378,
        task: {
          create: {
            updatedAt: '2023-09-05T09:09:01.111Z',
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

export type StandardScenario = ScenarioData<Repeat, 'repeat'>
