import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        title: 'String',
        color: 'String',
        category: {
          create: {
            title: 'String9146583',
            user: {
              create: {
                updatedAt: '2023-09-30T05:13:17.791Z',
                email: 'String5192222',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        color: 'String',
        category: {
          create: {
            title: 'String5932338',
            user: {
              create: {
                updatedAt: '2023-09-30T05:13:17.791Z',
                email: 'String8711048',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
