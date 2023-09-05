import type { Prisma, Repeat } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RepeatCreateArgs>({
  repeat: {
    one: {
      data: {
        updatedAt: '2023-09-05T09:03:19.057Z',
        startDate: '2023-09-05T09:03:19.057Z',
        startTime: '2023-09-05T09:03:19.057Z',
        endDate: '2023-09-05T09:03:19.057Z',
        endTime: '2023-09-05T09:03:19.057Z',
        interval: 1149092,
      },
    },
    two: {
      data: {
        updatedAt: '2023-09-05T09:03:19.057Z',
        startDate: '2023-09-05T09:03:19.057Z',
        startTime: '2023-09-05T09:03:19.057Z',
        endDate: '2023-09-05T09:03:19.057Z',
        endTime: '2023-09-05T09:03:19.057Z',
        interval: 3971751,
      },
    },
  },
})

export type StandardScenario = ScenarioData<Repeat, 'repeat'>
