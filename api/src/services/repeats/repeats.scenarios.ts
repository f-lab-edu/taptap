import type { Prisma, Repeat } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.RepeatCreateArgs>({
  repeat: {
    one: {
      data: {
        updatedAt: '2023-09-28T09:48:17.499Z',
        daysOfWeek: '0',
        daysOfMonth: 'String',
        task: {
          create: {
            title: 'String',
            color: 'String',
            category: {
              create: {
                title: 'String2593219',
                user: {
                  create: {
                    updatedAt: '2023-09-28T09:48:17.499Z',
                    email: 'String6303528',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-09-28T09:48:17.499Z',
        daysOfWeek: '0',
        daysOfMonth: 'String',
        task: {
          create: {
            title: 'String',
            color: 'String',
            category: {
              create: {
                title: 'String3020582',
                user: {
                  create: {
                    updatedAt: '2023-09-28T09:48:17.499Z',
                    email: 'String6184534',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Repeat, 'repeat'>
